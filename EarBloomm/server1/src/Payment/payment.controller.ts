// payment.controller.ts
import { Controller, Post, Body, Req ,Get} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../jwtauth.gaurd'
import { UseGuards } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async pay(@Body() body: { amount: number; }, @Req() req) {
    const { amount } = body;
    const userEmail = req.user.email; 

    const paymentSuccess = await this.paymentService.processPayment(amount, userEmail);

    if (paymentSuccess) {
      const cartClearMessage = await this.paymentService.clearCartAfterPayment(userEmail);
      return { message: 'Payment successful', cartStatus: cartClearMessage };
    } else {
      return { message: 'Payment failed, please try again later' };
    }
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getOrders(@Req() req) {
    const email = req.user.email;
    return this.paymentService.getOrdersByEmail(email);
  }


}
