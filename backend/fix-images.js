import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './database/db.js';
import https from 'https';

dotenv.config();
connectDB();

const fallbackImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop', // Headphones
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop', // Watch
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop', // Shoes
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop', // Camera
  'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop'  // Chair
];

const checkImage = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      // If redirect or success
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
};

const fixImages = async () => {
  try {
    const products = await Product.find({});
    let fixedCount = 0;
    
    for (let product of products) {
      if (product.imageUrls && product.imageUrls.length > 0) {
        const url = product.imageUrls[0];
        const isValid = await checkImage(url);
        
        if (!isValid) {
          // Replace with a random fallback
          const fallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
          product.imageUrls = [fallback];
          await product.save();
          fixedCount++;
          console.log(`Fixed broken image for: ${product.name}`);
        }
      }
    }
    
    console.log(`✅ Finished checking images. Fixed ${fixedCount} broken images.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixImages();
