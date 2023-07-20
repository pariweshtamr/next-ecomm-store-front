import dbConnect from "@/lib/mongoose"
import Stripe from "stripe"
import { buffer } from "micro"
import Order from "@/models/Order"

const endpointSecret = "whsec_CuUEtN2ESkGpAPXfKmJ2L0nBXFify5Tr"

async function handler(req, res) {
  await dbConnect()
  const stripe = new Stripe(process.env.STRIPE_SK)
  const sig = req.headers["stripe-signature"]

  let event

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    )
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object
      // Then define and call a function to handle the event payment_intent.succeeded
      const orderId = data.metadata.orderId
      const paid = data.payment_status === "paid"
      const amount = data.amount_total

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
          amount: amount / 100,
        })
      }

      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send("OK")
}

export const config = {
  api: { bodyParser: false },
}

export default handler
