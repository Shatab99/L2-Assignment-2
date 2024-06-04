import express from 'express'
import { productController } from './product.controller'

const router = express.Router()


router.get('/search/api/products', productController.searchProducts)
router.post('/api/products', productController.addProduct)
router.get('/api/products', productController.getAllProducts)
router.get('/api/products/:id', productController.getSingleProduct)
router.put('/api/products/:id', productController.updateById)
router.delete('/api/products/:id', productController.deleteById)

export const productRoute = router
