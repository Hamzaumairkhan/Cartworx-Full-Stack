import Order from "../models/orderModel.js";

// Fake "create order" (Razorpay style mimic)
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const fakeOrder = {
      id: "order_fake_" + Date.now(),
      amount: amount * 100,
      currency: "PKR",
      status: "created",
    };

    return res.status(201).json(fakeOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Fake verification (always success)
export const verifyPayment = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
    } = req.body;

    // skip crypto verification (demo only)

    const order = await Order.create({
      user: req.body.user,
      products: req.body.products,
      shippingAddress: req.body.shippingAddress,
      totalAmount: req.body.amount,
      paymentMethod: "Fake Razorpay",
      paymentStatus: "Paid",
      isPaid: true,
      paidAt: new Date(),
      status: "Processing",
    });

    return res.status(200).json({
      success: true,
      message: "Payment Verified (Fake)",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};