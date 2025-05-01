import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Delete,
    Patch,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { CartService } from './cart.service';
  import { JwtAuthGuard } from '../jwtauth.gaurd'
  import { Types } from 'mongoose';
  
  @Controller('cart')
  export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    // Add a product to the cart
    @Post('add')
    @UseGuards(JwtAuthGuard) 
    async addToCart(
      @Req() req, 
      @Body() body: { productId: string; quantity: number } 
    ) {
        const userEmail = req.user.email
      const productId = new Types.ObjectId(body.productId); 
      return this.cartService.addToCart(userEmail, productId, body.quantity);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard) 
    async getCartItems(@Req() req) {
      const userEmail = req.user.email; 
      return this.cartService.getCartItems(userEmail); 
    }

    // Update the quantity of a product in the cart
    @Patch('update/:productId')
    @UseGuards(JwtAuthGuard)
    async updateCartItemQuantity(
      @Param('productId') productId: string,
      @Body() body: { quantity: number }, 
      @Req() req
    ) {
      const userEmail = req.user.email;
      return this.cartService.updateCartItemQuantity(
        userEmail,
        new Types.ObjectId(productId),
        body.quantity
      );
    }


  // Remove a product from the cart
  @Delete('remove/:productId')
  @UseGuards(JwtAuthGuard) 
  async removeFromCart(
    @Param('productId') productId: string,  // Get the productId from the request params
    @Req() req // Access the logged-in user's email from the request
  ) {
    // Validate the productId format before proceeding
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID format');
    }

    const userEmail = req.user.email;
    return this.cartService.removeFromCart(userEmail, new Types.ObjectId(productId));
  }


  // Route to remove all items from cart
  @Delete('removeAll')
  @UseGuards(JwtAuthGuard)
  async removeAllFromCart(@Req() req) {
    const userEmail = req.user.email;  
    return this.cartService.removeAllFromCart(userEmail);  
  }

}
  
  