const express = require("express");
// const { auth, isUser } = require("../middlewares/auth");
const { orderCreate, deleteOrder } = require("../controllers/order");
const { get_pending_reviewed, get_dispatch, get_delivered } = require("../controllers/Tracker");
const { get_All_Pending_Reviewed, get_Admin_dispatch, get_Admin_delivered, mark_reviewed, mark_Dispatched, mark_Delivered, mark_Pending } = require("../controllers/AdminTracker");
const order_router = express.Router();

//create a order
order_router.post('/createOrder' , orderCreate)

//delete order
order_router.post('/deleteOrder', deleteOrder)


order_router.get('/getPendingReviewed/:userId', get_pending_reviewed)
order_router.get('/dispatch/:userId' , get_dispatch)
order_router.get('/delivered/:userId', get_delivered)

order_router.get('/adminPending', get_All_Pending_Reviewed)
order_router.get('/adminDispatched' , get_Admin_dispatch)
order_router.get('/adminDelivered' , get_Admin_delivered)

order_router.post('/markPending',mark_Pending)
order_router.post('/markReviewed' , mark_reviewed)
order_router.post('/markDispatched', mark_Dispatched)
order_router.post('/markDelivered' , mark_Delivered)


module.exports = order_router
