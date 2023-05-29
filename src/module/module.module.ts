import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenuDetail } from 'output/entities/OrderMenuDetail';
import { OrderMenus } from 'output/entities/OrderMenus';
import { RestoMenuPhotos } from 'output/entities/RestoMenuPhotos';
import { RestoMenus } from 'output/entities/RestoMenus';
import { OrderMenuDetailController } from 'src/order-menu-detail/order-menu-detail.controller';
import { OrderMenuDetailService } from 'src/order-menu-detail/order-menu-detail.service';
import { OrderMenusController } from 'src/order-menus/order-menus.controller';
import { OrderMenusService } from 'src/order-menus/order-menus.service';
import { RestoMenuPhotosService } from 'src/resto-menus-photos/resto-menus-photos.service';
import { RestoMenusController } from 'src/resto-menus/resto-menus.controller.spec';
import { RestoMenusService } from 'src/resto-menus/resto-menus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderMenuDetail,
      OrderMenus,
      RestoMenuPhotos,
      RestoMenus,
    ]),
  ],
  providers: [
    RestoMenusService,
    RestoMenuPhotosService,
    OrderMenusService,
    OrderMenuDetailService,
  ],
  controllers: [
    RestoMenusController,
    RestoMenusController,
    OrderMenusController,
    OrderMenuDetailController,
  ],
})
export class ModuleModule {}
