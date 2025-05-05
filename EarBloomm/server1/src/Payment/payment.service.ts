import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema'
import { CartService } from '../Cart/cart.service';
import { ProductService } from '../Product/product.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  async processPayment(amount: number, email: string): Promise<string> {
    try {
      console.log(`Processing payment for ${email} of amount ${amount}`);
      return 'Payment successful';
    } catch (error) {
      console.error('Error processing payment', error);
      return 'failed';
    }
  }

  async storeOrder(details: {
    name: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
  }): Promise<string> {
    const cartItems = await this.cartService.getCartByEmail(details.email);
    
    const formattedProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await this.productService.getProductById(item.product.toString());

  
        if (!product) {
          console.warn(`Product not found for ID: ${item.product}`);
          return null; 
        }
  
        return {
          productId: product._id.toString(),
          name: product.productname,
          image: product.images,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );
  
    // Filter out any null values (missing products)
    const filteredProducts = formattedProducts.filter((p) => p !== null);
  
    await this.paymentModel.create({
      ...details,
      products: filteredProducts,
    });
  
    return 'Order stored successfully';
  }
  

  async clearCartAfterPayment(userEmail: string): Promise<string> {
    try {
      const result = await this.cartService.removeAllFromCart(userEmail);
      return result.message;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return 'Payment successful, but failed to clear cart';
    }
  }

  async getOrdersByEmail(email: string) {
    try {
      const orders = await this.paymentModel.find({ email }).sort({ createdAt: -1 });
      return orders;
    } catch (error) {
      console.error('Error fetching orders', error);
      throw new Error('Failed to fetch orders');
    }
  }
}
