import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './createProduct.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async addProduct(productData: CreateProductDto): Promise<{ message: string }> {
    try {
      const existing = await this.productModel.findOne({ productid: productData.productid });
      if (existing) {
        throw new BadRequestException('Product already added!!!!');
      }

      const newProduct = new this.productModel(productData);
      await newProduct.save();
      return {message:'Successfully added a Product..'}
    } 
    catch (error) {
      console.error('Product Add Error:', error)
      throw new InternalServerErrorException('Error adding product');
    }
  }


  async viewProduct(productid:string) : Promise<any>{

    try
    {
        const existingProduct = await this.productModel.findOne({productid})

        if(existingProduct)
        {
            return existingProduct
        }
        else
        {
            throw new BadRequestException("Product not found")
        }
    }
    catch(error)
    {
        throw new InternalServerErrorException('Error viewing product')
    }
  }


  async viewAllProduct() : Promise<any>{

    try
    {
        const existingProduct = await this.productModel.find()

        if(existingProduct)
        {
            return existingProduct
        }
        else
        {
            throw new BadRequestException("Products not found")
        }
    }
    catch(error)
    {
        throw new InternalServerErrorException('Error viewing product')
    }
  }


  async deleteProduct(productid:string) : Promise<{ message: string }>{

    try
    {
        const existingProduct = await this.productModel.findOne({productid})

        if(!existingProduct)
        {
            throw new BadRequestException("Product not found")
        }
        else
        {
            await this.productModel.findOneAndDelete({productid})
            return {message:"Successfully deleted a product!!!!!"}
        }
    }
    catch(error)
    {
        throw new InternalServerErrorException('Error viewing product')
    }
  }


  // async updateProduct(productid:string ,body:any) : Promise<string>{
  //   try{
  //       console.log(body)
  //       const existingProduct = await this.productModel.findOne({productid: body.productid})
  //       if(!existingProduct)
  //       {
  //           throw new BadRequestException("Product not found..")
  //       }
  //       existingProduct.productname=body.productname,
  //       existingProduct.price=body.price,
  //       existingProduct.description=body.description,
  //       existingProduct.category=body.category,
  //       existingProduct.type=body.type,
  //       existingProduct.quantity=body.quantity
  //       if (body.images) {
  //           existingProduct.images = body.images
  //         }
      
  //         await existingProduct.save()
      
  //         return "Product updated successfully"
  //   }
  //   catch(error)
  //   {
  //       console.error(error)
  //       throw new InternalServerErrorException("Error updating book")
  //   }
  // }

  async updateProduct(productid: string, body: any): Promise<string> {
    try {

      const existingProduct = await this.productModel.findOne({ productid });
  
      if (!existingProduct) {
        throw new BadRequestException("Product not found.");
      }
  
      existingProduct.productname = body.productname;
      existingProduct.price = body.price;
      existingProduct.description = body.description;
      existingProduct.category = body.category;
      existingProduct.type = body.type;
      existingProduct.quantity = body.quantity;
  
      if (body.images) {
        existingProduct.images = body.images;
      }
  
      await existingProduct.save();
  
      return "Product updated successfully";
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error updating product");
    }
  }
  
}
