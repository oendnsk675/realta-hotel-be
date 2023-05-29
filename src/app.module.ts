import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderMenuDetailController } from './order-menu-detail/order-menu-detail.controller';
import { OrderMenuDetailService } from './order-menu-detail/order-menu-detail.service';
import { OrderMenusController } from './order-menus/order-menus.controller';
import { OrderMenusService } from './order-menus/order-menus.service';
import { RestoMenuPhotosController } from './resto-menus-photos/resto-menus-photos.controller';
import { RestoMenuPhotosService } from './resto-menus-photos/resto-menus-photos.service';
import { RestoMenusController } from './resto-menus/resto-menus.controller';
import { RestoMenusService } from './resto-menus/resto-menus.service';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cozy190900',
      database: 'RealtaHotels',
      entities: ['dist/output/entities/*.js'],
      synchronize: true,
    }),
    ModuleModule,
  ],
})
export class AppModule {}
