import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CartModule } from '../Cart/cart.module'
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../schemas/payment.schema'
import { ProductModule } from 'src/Product/product.module';

@Module({
  imports: [CartModule, ProductModule, MongooseModule.forFeature([
    { name: Payment.name, schema: PaymentSchema },
  ]),], 
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
