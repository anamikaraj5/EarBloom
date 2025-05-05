import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema'
import { Product, ProductDocument } from '../schemas/product.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addToCart(userEmail: string, productId: Types.ObjectId, quantity: number) {
    const existing = await this.cartModel.findOne({ userEmail, product: productId });
  
    if (existing) {
      return { message: 'Product already added to cart' };
    }
  
    const product = await this.productModel.findById(productId);
  
    if (!product) {
      return { message: 'Product not found' };
    }
  
    if (product.quantity < quantity) {
      return { message: 'Not enough stock available' };
    }

    product.quantity -= quantity;
    await product.save();

    const cartItem = await this.cartModel.create({
      userEmail,
      product: productId,
      quantity,
    });
  
    return { message: 'Product added to cart', cartItem };
  }
  
  
  

  async getCartItems(userEmail: string) {
    const cartItems = await this.cartModel
      .find({ userEmail })
      .populate('product');
  
    return cartItems.filter((item) => item.product !== null);
  }
  

  async updateCartItemQuantity(
    userEmail: string,
    productId: Types.ObjectId,
    quantityChange: number
  ) {
    const cartItem = await this.cartModel.findOne({ userEmail, product: productId });
    if (!cartItem) throw new NotFoundException('Cart item not found');
  
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');
  
    const newQuantity = cartItem.quantity + quantityChange;
  
    if (newQuantity < 1) {
      await cartItem.deleteOne(); 
      return { message: 'Product removed from cart' };
    }
  
    if (quantityChange > 0 && product.quantity < quantityChange) {
      throw new BadRequestException(`Only ${product.quantity} items available in stock`);
    }
  
    cartItem.quantity = newQuantity;
    await cartItem.save();

    product.quantity -= quantityChange;
    await product.save();
  
    return { message: 'Quantity updated' };
  }
  

  async removeFromCart(userEmail: string, productId: Types.ObjectId) {
    const cartItem = await this.cartModel.findOne({ userEmail, product: productId });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    const product = await this.productModel.findById(productId);
    if (product) {
      product.quantity += cartItem.quantity; 
      await product.save();
    }

    await this.cartModel.deleteOne({ _id: cartItem._id });

    return { message: 'Item removed from cart and stock restored' };
  }


  async removeAllFromCart(userEmail: string) {
    const cartItems = await this.cartModel.find({ userEmail });
  
    if (cartItems.length === 0) {
      return { message: 'Cart already empty' }; 
    }
  
    await this.cartModel.deleteMany({ userEmail });
  
    return { message: 'All items removed from cart ' };
  }
  
  async getCartByEmail(email: string) {
    return this.cartModel.find({ userEmail: email });
  }
  
  
  
  
}

