import { Request, Response } from "express";
import { OrderValidationSchema } from "./order.validation";
import { OrderModel } from "./order.modal";
import { ProductModal } from "../products/product.modal";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderValidate = OrderValidationSchema.safeParse(req.body);
        if (!orderValidate.success) {
            console.log("Validation Error")
        }
        else {
            const order = new OrderModel(orderValidate.data);
            const product = await ProductModal.findOne({ _id: order.productId })
            const productQuantity = (product?.inventory.quantity) as number
            const productInStock = (product?.inventory.inStock) as boolean
            const id = (product?._id) as any
            console.log(productInStock, productQuantity)
            if (productQuantity <= 0) {
                console.log("Opps Sorry !! insufficient stock ")
            }
            else {
                const newQuantity = productQuantity - order.quantity;
                if (newQuantity < 0) {
                    console.log("Order is more Than Quantity !!")
                }
                else if (newQuantity === 0 ) {
                    const upddateInStock = await ProductModal.findOneAndUpdate(id, {
                        $set: {
                            'inventory.inStock': false,
                            'inventory.quantity': newQuantity
                        }
                    })
                    res.send(upddateInStock);
                }
                else {
                    const result = await order.save()
                    const updateProduct = await ProductModal.findOneAndUpdate(id, {
                        $set: {
                            'inventory.quantity': newQuantity
                        }
                    })
                    res.send({ result, updateProduct })
                }
            }
        }
    } catch (err) { console.log(err) }
}

const getAllOrder = async (req: Request, res: Response) => {
    try {
        const result = await OrderModel.find()
        res.send(result)
    } catch (err) { console.log(err) }
}

const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const result = await OrderModel.find({ email: email })
        res.send(result);

    } catch (err) { console.log(err) }
}

export const OrderController = {
    createOrder, getAllOrder, getOrdersByEmail
}