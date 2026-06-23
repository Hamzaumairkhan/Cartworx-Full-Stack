import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments({});
    const totalProducts = await productModel.countDocuments({});
    const totalUsers = await userModel.countDocuments({ role: 'user' });

    const orders = await orderModel.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + (item.totalAmount || 0), 0);

    res.json({ totalOrders, totalProducts, totalUsers, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};