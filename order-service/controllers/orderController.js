const Order = require('../models/order');
const { publishOrderPlaced } = require('../services/rabbitmqPublisher');

exports.placeOrder = async (req, res, next) => {
  try {
    console.log("Order payload received:", req.body); // Add this line
    const { userId, items, total } = req.body;
    const order = await Order.create({ userId, items, total });
    await publishOrderPlaced(order);
    res.status(201).json({ message: 'Order placed!', order });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};