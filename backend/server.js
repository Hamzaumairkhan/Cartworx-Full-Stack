import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/payment/', paymentRoutes);
app.use('/api/analytics/', analyticsRoutes);

// http://localhost:8000/api/auth/user/register

// Export the app for Vercel serverless function
export default app;

// Ensure database connection is established
connectDB();

// Only listen on a port if not running in a serverless environment like Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
