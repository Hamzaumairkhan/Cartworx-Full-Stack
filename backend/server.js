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
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL, // e.g. https://cartworx.vercel.app
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        
        // Allow allowed origins and any vercel preview deployments
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for health check
app.get('/', (req, res) => {
    res.send('Cartworx API is running successfully!');
});

app.use('/api/auth/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/payment/', paymentRoutes);
app.use('/api/analytics/', analyticsRoutes);

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
