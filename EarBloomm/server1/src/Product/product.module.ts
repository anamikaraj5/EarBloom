import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product,productschema } from "src/schemas/product.schema";
import { ProductController} from "./product.controller";
import { ProductService } from "./product.service";

@Module(
    {
        imports: [MongooseModule.forFeature([{
            name : Product.name,
            schema:productschema,
        }])],
        exports: [
            MongooseModule, // 👈 This is critical!
          ],
        providers: [ProductService],
        controllers: [ProductController]
    }
)
export class ProductModule{}