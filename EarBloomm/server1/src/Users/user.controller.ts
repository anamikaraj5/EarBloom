import { Controller, Post, Body, UsePipes, ValidationPipe,Res, Get,UseGuards,Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/createUser.dto";
import { Response } from  'express'
import { JwtAuthGuard } from "src/jwtauth.gaurd";

@Controller('user')
export class usercontroller{
    constructor(private userservice : UserService){}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createuserdto: createUserDto) {
        console.log(createuserdto);
        return await this.userservice.createUser(createuserdto); 
    }
        
    @Post('/login')
    @UsePipes(new ValidationPipe())
    async logninuser(@Body() body: { email: string, password: string },  @Res({ passthrough: true }) res: Response){
        const { email, password } = body
        return await this.userservice.loginuser(email, password, res)
    }


    @Get('/logout')
    async logout(@Res({ passthrough: true }) res: Response){
        return await this.userservice.logout(res)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
    return { role: req.user.role };
}

}