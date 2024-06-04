import { Request, Response } from "express"
import { ProductModal } from "./product.modal";
import { ProductsValidateSchema } from "./product.validation";

const addProduct = async (req: Request, res: Response) => {
    try {
        const productsValidate = ProductsValidateSchema.safeParse(req.body);
        if (!productsValidate.success as boolean) {
            console.log("Validation wrong!")
        }
        else {
            const product = new ProductModal(productsValidate.data)
            const result = await product.save()
            res.send(result)
        }
    }
    catch (err) { console.log(err) }
}


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductModal.find()
        res.send(result)
    } catch (err) { console.log(err) }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await ProductModal.findById(id);
        res.send(result);
    } catch (err) { console.log(err) }
}

const updateById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await ProductModal.findByIdAndUpdate(id, req.body, { new: true })
        res.send(result)
    } catch (err) { console.log(err) }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await ProductModal.findByIdAndDelete(id)
        res.send(result)
    } catch (err) { console.log(err) }
}

const searchProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm ? (req.query.searchTerm as string).split(' ') : [];
        console.log(searchTerm)
        const result = await ProductModal.find({
            name: {
                $in: searchTerm.map(term => (new RegExp(term, 'i')))
            }
        })
        console.log(result)
        res.send(result)
        res.send(result)
    } catch (err) { console.log(err) }
}


export const productController = {
    addProduct, getAllProducts, getSingleProduct, updateById, deleteById, searchProducts
}

