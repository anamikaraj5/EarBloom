import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../schemas/cart.schema'
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductModule } from 'src/Product/product.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
