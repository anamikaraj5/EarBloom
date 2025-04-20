import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config'
import { ProductModule } from './Product/product.module';
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjssample'),
    UsersModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available app-wide
    })
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}

// import { MulterModule } from '@nestjs/platform-express';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRoot('mongodb://localhost:27017/nestjssample'),
//     MulterModule.register({
//       dest: './uploads', // destination for storing images
//     }),
//     UsersModule,
//     ProductModule,
//   ],
//   controllers: [],
//   providers: [JwtStrategy],
// })
// export class AppModule {}

