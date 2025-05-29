const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

router.use((req, res, next) => {
  console.log(`Order route accessed: ${req.method} ${req.path}`);
  next();
});

router.get('/', (req, res) => res.json({ message: 'Order routes working!' }));
router.post('/place', placeOrder);
router.get('/all', getOrders);

module.exports = router;