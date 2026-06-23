import orderModel from "../models/orderModel.js";
import sendEmail from "../utils/sendEmail.js";


export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentMethod } = req.body;
        const user = req.user._id;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Items are required" });
        }

        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        const order = new orderModel({
            user,
            items,
            totalAmount,
            address,
            paymentMethod
        });

        await order.save();
        const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\n Cartworx Team`;

        await sendEmail(req.user.email, "Order Placed", message);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    
export const myOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id }).populate("items.productID", "name price");   
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("user", "id name ")
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderModel.findById(req.params.id);
        if(order){
            order.status = status;
            await order.save();
            res.json({ message: "Order status updated", order })
        }
    else {
        res.status(404).json({ message: "Order not found" });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};