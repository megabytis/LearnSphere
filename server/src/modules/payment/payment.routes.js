const express = require("express");
const { createCheckoutSession, handleWebhook } = require("./payment.controller");
const { userAuth } = require("../../middleware/Auth");

const router = express.Router();

// Create checkout session (requires authentication)
router.post("/create-checkout-session/:courseId", userAuth, createCheckoutSession);

// Stripe webhook (no auth, raw body required)
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

module.exports = router;
