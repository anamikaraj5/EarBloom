import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  amount: number;

  @Prop()
  products: {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
