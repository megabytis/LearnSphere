const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createError } = require("../../utils/error");
const { validateMongoID } = require("../../utils/validate");
const { courseModel } = require("../course/course.model");
const { enrollmentModel } = require("../enrollments/enrollment.model");

const createCheckoutSession = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    validateMongoID(courseId);

    const course = await courseModel.findById(courseId);
    if (!course) {
      throw createError("Course not found!", 404);
    }

    if (!course.published) {
      throw createError("Course is not available for enrollment!", 400);
    }

    // Check if already enrolled
    const existingEnrollment = await enrollmentModel.findOne({
      userId: req.user._id,
      courseId: courseId,
      status: "active",
    });

    if (existingEnrollment) {
      throw createError("You are already enrolled in this course!", 400);
    }

    // Handle free courses
    if (course.price === 0) {
      const enrollment = new enrollmentModel({
        userId: req.user._id,
        courseId: courseId,
        status: "active",
        enrolledAt: new Date(),
      });
      await enrollment.save();

      return res.status(200).json({
        message: "Enrolled successfully! (Free course)",
        free: true,
        redirectUrl: `/courses/${courseId}`,
      });
    }

    // Create Stripe checkout session for paid courses
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: course.currency || "inr",
            product_data: {
              name: course.title,
              description: course.description?.substring(0, 200) || "Course enrollment",
            },
            unit_amount: course.price, // Already in paisa/cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: courseId,
        userId: req.user._id.toString(),
      },
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment/cancel?courseId=${courseId}`,
    });

    return res.status(200).json({
      message: "Checkout session created",
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    next(err);
  }
};

const handleWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { courseId, userId } = session.metadata;

      console.log(`Payment completed for course ${courseId} by user ${userId}`);

      // Check if enrollment already exists (idempotency)
      const existingEnrollment = await enrollmentModel.findOne({
        userId: userId,
        courseId: courseId,
        status: "active",
      });

      if (!existingEnrollment) {
        const enrollment = new enrollmentModel({
          userId: userId,
          courseId: courseId,
          status: "active",
          enrolledAt: new Date(),
        });
        await enrollment.save();
        console.log(`Enrollment created for user ${userId} in course ${courseId}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
};
