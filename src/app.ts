import express from 'express'
import cors from 'cors'
import { productRoute } from './app/products/products.routes'
import { OrderRoute } from './app/orders/order.route'
const app = express()


//middle ware 
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//All Routes here

app.use('/', productRoute)
app.use('/', OrderRoute)

export default app