import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderMenuDetailService } from './order-menu-detail.service';

@Controller('order-menu-detail')
export class OrderMenuDetailController {
  constructor(
    private readonly orderMenuDetailService: OrderMenuDetailService,
  ) {}

  @Get()
  findAllOrderMenuDetail(): Promise<any> {
    return this.orderMenuDetailService.findAllOrderMenuDetail();
  }

  @Get(':id')
  findOneOrderMenuDetail(@Param() params): Promise<any> {
    return this.orderMenuDetailService.findOneOrderMenuDetail(params.id);
  }

  @Post()
  async createOrderMenuDetail(@Body() body): Promise<any> {
    return await this.orderMenuDetailService.createOrderMenusDetail(body);
  }

  @Put(':id')
  updateOrderMenuDetail(@Param() params: any, @Body() body): any {
    return this.orderMenuDetailService.updateOrdeMenuDetail(params.id, body);
  }

  @Delete(':id')
  deleteOrderMenuDetail(@Param() params): any {
    return this.orderMenuDetailService.deleteOrdeMenuDetail(params.id);
  }
}
