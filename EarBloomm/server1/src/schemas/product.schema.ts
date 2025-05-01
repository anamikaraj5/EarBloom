import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  productname: string;

  @Prop({ required: true, unique: true })
  productid: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  category: string;

  @Prop()
  type: string;

  @Prop()
  quantity: number;

  @Prop({ type: [String] })
  images: string[];
}

export type ProductDocument = Product & Document; 

export const productschema = SchemaFactory.createForClass(Product);
