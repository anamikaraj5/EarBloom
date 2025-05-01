// payment.service.ts
import { Injectable } from '@nestjs/common';
import { CartService } from '../Cart/cart.service'

@Injectable()
export class PaymentService {
  constructor(private readonly cartService: CartService) {}

  // Simulate processing the payment (you can replace this with actual payment gateway logic later)
  async processPayment(amount: number, currency: string, email: string): Promise<boolean> {
    try {
      // Simulate a successful payment processing
      console.log(`Processing payment for ${email} of amount ${amount} ${currency}`);
      // Assuming the payment is successful, return true
      return true;
    } catch (error) {
      console.error('Error processing payment', error);
      return false;
    }
  }

  // Handle clearing the cart after a successful payment
  async clearCartAfterPayment(userEmail: string): Promise<string> {
    try {
      await this.cartService.removeAllFromCart(userEmail); // Clear all items in the cart
      return 'Payment successful and cart cleared';
    } catch (error) {
      console.error('Error clearing cart', error);
      return 'Payment successful, but failed to clear cart';
    }
  }
}
