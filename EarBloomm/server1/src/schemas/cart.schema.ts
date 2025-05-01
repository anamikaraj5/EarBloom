import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../schemas/product.schema'

@Schema()
export class Cart {
    @Prop({ required: true })
    userEmail: string;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}

export type CartDocument = Cart & Document; // CartDocument is now the type that extends the base Document type

export const CartSchema = SchemaFactory.createForClass(Cart);

