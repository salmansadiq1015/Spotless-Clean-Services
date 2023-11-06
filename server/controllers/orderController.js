import orderModel from "../models/orderModel.js";
import stripe from "stripe";
const stripeInstance = stripe(
  "sk_test_51NprH7KJaQYf37ladis9zxrjr1tbLHNEzb8PSZ4PvD19JJWO0iUKVsxUkyrAG6uJTItigaEyF8PUEOdnURIaqVTC00rjmHrwHi"
);

// -----------------Checkout--------------->
export const postOrderController = async (req, res) => {
  try {
    const { order } = req.body;

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          unit_amount: order.price * 100,
          product_data: {
            name: order?.service,
          },
        },
        quantity: 1,
      },
    ];

    // -----------Stripe Integration
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/error`,
    });

    res.json({ id: session.id });

    // --------------Store in DataBase------------->
    await orderModel({ ...order }).save();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error while payment",
      error,
    });
  }
};

// Get All orders

export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).send({
      success: true,
      message: "All orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting orders!",
      error,
    });
  }
};

// Change Status Controller
export const chageStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log(order);
    res.status(200).send({
      success: "true",
      message: "Status Updated!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while change order status!",
      error,
    });
  }
};

// ========Delete Order============>
export const deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const order = await orderModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Error while deleting order!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while deleting order!",
      error,
    });
  }
};
