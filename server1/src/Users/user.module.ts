import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {user,userschema} from 'src/schemas/user.schema'
import { UserService } from "./user.service";
import { usercontroller } from "./user.controller";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module(
    {
        imports: [MongooseModule.forFeature([{
            name : user.name,
            schema:userschema,
        }]) ,
        ConfigModule, 
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('SECRET_KEY'),
          }) })],


        providers: [UserService],
        controllers: [usercontroller]
    }
)
export class UsersModule{}