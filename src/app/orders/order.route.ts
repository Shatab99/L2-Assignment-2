import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

router.get('/search/api/orders', OrderController.getOrdersByEmail)
router.get('/api/orders', OrderController.getAllOrder)
router.post('/api/orders', OrderController.createOrder)



export const OrderRoute = router