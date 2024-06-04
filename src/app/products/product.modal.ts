import mongoose, { Schema, model } from "mongoose"
import { Inventory, Products, TVariant } from "./product.interface"


const variantsSchema = new Schema<TVariant>({
    type : String,
    value : String
})

const InventorySchema = new Schema<Inventory>({
    quantity : Number,
    inStock : Boolean
})

const productSchema = new Schema<Products>({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    tags : [{
        type : String
    }],
    variants : [variantsSchema],
    inventory : InventorySchema
})


export const ProductModal = mongoose.model("Product", productSchema)