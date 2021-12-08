import path from 'path'
import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import stampRoutes from './routes/stampRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import expertiseRoutes from './routes/expertiseRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('API is running...')
})


app.use('/api/stamps', stampRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/expertise', expertiseRoutes)

const __dirname = path.resolve()
app.use('/image', express.static(path.join(__dirname, '/uploads')))


//Middleware use DO NOT PUT IT BEFORE OTHER ROUTES
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow))