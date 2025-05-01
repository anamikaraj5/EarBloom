// payment.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../jwtauth.gaurd'
import { UseGuards } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // POST method to initiate the payment process
  @Post('pay')
  @UseGuards(JwtAuthGuard) // Protect the route using JWT authentication
  async pay(@Body() body: { amount: number; currency: string }, @Req() req) {
    const { amount, currency } = body;
    const userEmail = req.user.email; // Get the user's email from the JWT payload

    // Process the payment (this could involve payment gateway integration)
    const paymentSuccess = await this.paymentService.processPayment(amount, currency, userEmail);

    if (paymentSuccess) {
      // If payment is successful, clear the cart
      const cartClearMessage = await this.paymentService.clearCartAfterPayment(userEmail);
      return { message: 'Payment successful', cartStatus: cartClearMessage };
    } else {
      return { message: 'Payment failed, please try again later' };
    }
  }
}
