import { Injectable, BadRequestException, InternalServerErrorException, Body, UnauthorizedException, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { user } from "src/schemas/user.schema";
import { createUserDto } from "./dto/createUser.dto";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'


@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel: Model<user> ,private configService: ConfigService) {}

    async createUser(createUserDto: createUserDto): Promise<{ message: string }> {
        const { name, email, password} = createUserDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException("User already exists!!!!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword,
    
        });

        try {
            await newUser.save();
            return {message:"Successfully Registered....."};
        } 
        catch (error) {
            throw new InternalServerErrorException("Error saving user!!!!");
        }
    }

    async loginuser(email: string, password: string ,res: Response,) :Promise<{ message: string; token: string }>{

        try{

            const existingUser = await this.userModel.findOne({ email });
            if (!existingUser) {
                throw new BadRequestException("User adoes not exists!!!!");
            }

            const compared = await bcrypt.compare(password,existingUser.password)

            if(!compared)
            {
                throw new UnauthorizedException("Unauthorized access")
            }

            const secret = this.configService.get<string>('SECRET_KEY')

            if (!secret) {
                throw new Error('SECRET_KEY is not defined in the environment variables');
            }
    
            const payload = {
            sub: existingUser._id,
            email: existingUser.email,
            };

            const token = jwt.sign(payload, secret)
            res.cookie('jwt', token, {httpOnly: true,secure: false, });
      
            return {message:'Login successful',token}
    }
        catch(error){
            throw new InternalServerErrorException("Error while logging in")
        }

    
    }


    async logout(res: Response) :Promise<any>{
        res.clearCookie('jwt') 
    }
    
}

