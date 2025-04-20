export class CreateProductDto {
    productname: string;
    productid: string;
    price: number;
    description: string;
    category: string;
    type: string;
    quantity: number;
    images: string[]; 
  }
  
//   import { IsString, IsArray, IsOptional } from 'class-validator';

// export class CreateProductDto {
//   @IsString()
//   productid: string;

//   @IsString()
//   productname: string;

//   @IsString()
//   category: string;

//   @IsString()
//   description: string;

//   @IsString()
//   price: string;

//   @IsString()
//   quantity: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true }) // 👈 ensures base64 strings are allowed
//   images?: string[];
// }
