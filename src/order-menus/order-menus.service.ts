import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenus } from '../../output/entities/OrderMenus';
import { Repository } from 'typeorm';
import { OrderMenusDTO } from 'output/DTO/order-menu';
import { OrderMenuDetail } from 'output/entities/OrderMenuDetail';

@Injectable()
export class OrderMenusService {
  constructor(
    @InjectRepository(OrderMenus)
    private orderMenusRepository: Repository<OrderMenus>,
    @InjectRepository(OrderMenuDetail)
    private orderMenuDetailRepository: Repository<OrderMenuDetail>,
  ) {}

  async findAllOrderMenus(): Promise<any> {
    return await this.orderMenusRepository.find();
  }

  async findOneOrderMenus(orme_id: number): Promise<any> {
    const order_menu = await this.orderMenusRepository.findOne({
      where: {
        ormeId: orme_id,
      },
    });

    // console.log(order_menu);

    const order_menu_detail = await this.orderMenuDetailRepository
      .createQueryBuilder('order_menu_detail')
      .leftJoinAndSelect('order_menu_detail.omdeReme', 'resto_menus')
      .where('order_menu_detail.omde_orme_id = :prefix', {
        prefix: order_menu.ormeId,
      })
      .getMany();

    const result = { order_menu, order_menu_detail };

    if (result) {
      return result;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async generateUniqueOrderNumber(): Promise<string> {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const orderNumberPrefix = `FO-${year}${month}${day}`;

    const latestOrderNumber = await this.orderMenusRepository
      .createQueryBuilder('order_menus')
      .select('MAX(order_menus.ormeOrderNumber)', 'maxOrderNumber')
      .where('order_menus.ormeOrderNumber LIKE :prefix', {
        prefix: `${orderNumberPrefix}%`,
      })
      .getRawOne();

    let orderNumberCounter = 1;
    if (latestOrderNumber && latestOrderNumber.maxOrderNumber) {
      const latestCounter = parseInt(
        latestOrderNumber.maxOrderNumber.substr(-3),
        10,
      );
      if (!isNaN(latestCounter)) {
        orderNumberCounter = latestCounter + 1;
      }
    }

    const paddedCounter = orderNumberCounter.toString().padStart(3, '0');
    const uniqueOrderNumber = `${orderNumberPrefix}-${paddedCounter}`;

    return uniqueOrderNumber;
  }

  async createOrderMenus(data: OrderMenusDTO): Promise<any> {
    const orderNumber = await this.generateUniqueOrderNumber();

    const orderTotalAmount = await this.orderMenuDetailRepository.findOneBy({
      omdeId: data.orderDetails[0],
    });

    const date = new Date();
    const result = await this.orderMenusRepository.save({
      ormeOrderNumber: orderNumber,
      ormeOrderDate: date,
      ormeTotalItem: data.ormeTotalItem,
      ormeTotalDiscount: data.ormeTotalDiscount,
      ormeTotalAmount: orderTotalAmount.ormeSubtotal,
      ormePayType: data.ormePayType,
      ormeCardnumber: data.ormeCardnumber,
      ormeIsPaid: data.ormeIsPaid,
      ormeModifiedDate: date,
      ormeUser: data.ormeUserId,
    });

    const ormeId = result.ormeId;

    data.orderDetails.forEach(async (element) => {
      await this.orderMenuDetailRepository.update(
        { omdeId: element },
        {
          omdeOrme: ormeId,
        },
      );
    });

    return result;
  }

  async updateOrderMenus(id: number, data: OrderMenus): Promise<any> {
    const date = new Date();
    const result = await this.orderMenusRepository.update(
      {
        ormeId: id,
      },
      {
        ormeOrderNumber: data.ormeOrderNumber,
        ormeOrderDate: data.ormeOrderDate,
        ormeTotalItem: data.ormeTotalItem,
        ormeTotalDiscount: data.ormeTotalDiscount,
        ormeTotalAmount: data.ormeTotalAmount,
        ormePayType: data.ormePayType,
        ormeCardnumber: data.ormeCardnumber,
        ormeIsPaid: 'Y',
        ormeModifiedDate: date,
        ormeUserId: data.ormeUserId,
      },
    );
    return result + ' Sukses Mengupdate';
  }

  async deleteOrderMenus(id: number): Promise<any> {
    await this.orderMenusRepository.delete({
      ormeId: id,
    });
    return 'Sukses Menghapus';
  }

  async findLastOrder() {
    return await this.orderMenusRepository.query(
      'SELECT * FROM resto.order_menus ORDER BY orme_id DESC LIMIT 1',
    );
  }

  async getIdLast() {
    return await this.orderMenusRepository.query(
      'SELECT orme_id FROM resto.order_menus ORDER BY orme_id DESC LIMIT 1',
    );
  }
}
