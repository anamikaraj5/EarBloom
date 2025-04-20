import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class user{

    @Prop({required:true})
    name:string

    @Prop({ required: true, unique: true, index: true })
    email:string

    @Prop({required:true})
    password:string
}

export const userschema = SchemaFactory.createForClass(user)