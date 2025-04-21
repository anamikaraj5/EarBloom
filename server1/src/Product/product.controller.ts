  import {Controller,Post,Get,Query,Delete,Put,Body,UploadedFile,UseInterceptors,UsePipes,ValidationPipe,UseGuards, Param} from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { memoryStorage, Multer } from 'multer';
  import { ProductService } from './product.service';
  import { CreateProductDto } from './createProduct.dto';
  import { JwtAuthGuard } from '../jwtauth.gaurd'
  import { AuthGuard } from '@nestjs/passport';

  @Controller('product')
  export class ProductController {
    constructor(private productService: ProductService) {}
  

    //Adding product
    @Post('/addproduct')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
      }),
    )
    async addProduct(
      @UploadedFile() file: Multer.File,
      @Body() body: CreateProductDto,
    ) {

      console.log('File received:', file); 
    console.log('Body received:', body);

      let imageBase64: string | null = null;

      if (file) {
        console.log('Received file:', file)
        imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      }

  
      return this.productService.addProduct({
        ...body,
        images: imageBase64 ? [imageBase64] : [],
      });
    }



    //viewing product
    @Get('/viewproduct/:productid')
    @UseGuards(JwtAuthGuard)
    async viewProduct(@Param('productid') productid:string){
        return await this.productService.viewProduct(productid)
    }



    //viewallproducts
    @Get('/viewallproducts')
    @UseGuards(JwtAuthGuard)
    async viewAllProduct(){
      return await this.productService.viewAllProduct()
    }

    //deleting product
    @Delete('/deleteproduct/:productid')
    @UseGuards(JwtAuthGuard)
    async deleteProduct(@Param('productid') productid:string){
        return await this.productService.deleteProduct(productid)
    }



    //updating product
    @Put('/updateproduct/:productid')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
    )
    async updateProduct(
      @Param('productid') productid: string,
      @UploadedFile() file: Multer.File,
      @Body() body: any, 
    ) {
    
      let imageBase64: string | null = null;
      if (file) {
        imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
          'base64',
        )}`;
      }

      return this.productService.updateProduct(productid, {
        ...body,
        images: imageBase64 ? [imageBase64] : [],
      });
      
    }
  }
  
  