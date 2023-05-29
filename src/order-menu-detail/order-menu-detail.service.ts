import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderMenuDetail } from '../../output/entities/OrderMenuDetail';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderMenuDetailDto } from 'output/DTO/create-order-menu-details';

@Injectable()
export class OrderMenuDetailService {
  constructor(
    @InjectRepository(OrderMenuDetail)
    private orderMenuDetailRepository: Repository<OrderMenuDetail>,
  ) {}

  // Menampilkan Semua Data
  async findAllOrderMenuDetail(): Promise<any> {
    return await this.orderMenuDetailRepository.find();
  }

  //
  async findOneOrderMenuDetail(omde_id: number): Promise<any> {
    const result = await this.orderMenuDetailRepository.findOne({
      where: {
        omdeId: omde_id,
      },
    });

    if (result) {
      return result;
    }

    throw new HttpException('Categori not Found', HttpStatus.NOT_FOUND);
  }

  async createOrderMenusDetail(data: CreateOrderMenuDetailDto[]) {
    // const subtotal = data
    const dataArray = Object.keys(data)
      .filter((key) => key !== 'subtotal')
      .map((key) => data[key]);

    const subtotal = data['subtotal'];

    const result = await Promise.all(
      dataArray.map(async (restoMenuDto, index) => {
        // Memeriksa apakah key bukan "subtotal"
        if (index.toString() !== 'subtotal') {
          const orderMenuDetail = new OrderMenuDetail();
          // Set nilai properti berdasarkan DTO RestoMenuDto
          orderMenuDetail.ormePrice = restoMenuDto.remePrice;
          orderMenuDetail.ormeQty = restoMenuDto.quantity;
          orderMenuDetail.ormeSubtotal = subtotal;
          orderMenuDetail.ormeDiscount = '0';
          // Membuat hubungan dengan entitas OrderMenus
          orderMenuDetail.omdeReme = restoMenuDto.remeId;
          return this.orderMenuDetailRepository.save(orderMenuDetail);
        }
      }),
    );

    return result;
  }

  async updateOrdeMenuDetail(id: number, data: OrderMenuDetail): Promise<any> {
    const result = await this.orderMenuDetailRepository.update(
      {
        omdeId: id,
      },
      {
        ormePrice: data.ormePrice,
        ormeQty: data.ormeQty,
        ormeSubtotal: data.ormeSubtotal,
        ormeDiscount: data.ormeDiscount,
        omdeOrme: data.omdeOrme,
        omdeReme: data.omdeReme,
      },
    );
    return result + ' Sukses Mengupdate';
  }

  async deleteOrdeMenuDetail(id: number): Promise<any> {
    await this.orderMenuDetailRepository.delete({
      omdeId: id,
    });

    return 'Sukses Menghapus';
  }
}
