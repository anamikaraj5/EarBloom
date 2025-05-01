import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class user{

    @Prop({required:true})
    name:string

    @Prop({ required: true, unique: true, index: true })
    email:string

    @Prop({required:true})
    password:string

    @Prop({ required: true, enum: ['admin', 'user'] })
    role: 'admin' | 'user'    
}

export const userschema = SchemaFactory.createForClass(user)