import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }   
};


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock = 0 } = req.body;
        let imageUrls = [];

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
                
            });
            imageUrls = [result.secure_url];
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock: Number(stock),
            imageUrls
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
            product.imageUrls = [result.secure_url];
        }

        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = Number(price);
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = Number(stock);

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

