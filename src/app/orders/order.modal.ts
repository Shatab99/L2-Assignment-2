import mongoose, {Schema, model} from 'mongoose'
import { Order } from './order.interface'

const OrderSchema = new Schema <Order>({
    email : String,
    productId : String,
    price : Number,
    quantity : Number,
}) 


export const OrderModel = mongoose.model('Order', OrderSchema)