// payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CartModule } from '../Cart/cart.module'

@Module({
  imports: [CartModule], // Import CartModule to handle cart clearing
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
