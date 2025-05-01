import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config'
import { ProductModule } from './Product/product.module';
import { JwtStrategy } from './jwt.strategy'
import { CartModule } from './Cart/cart.module';
import { PaymentModule } from './Payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/earbloom'),
    UsersModule,
    ProductModule,
    CartModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    })
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}


