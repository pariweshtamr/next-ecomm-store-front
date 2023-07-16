import dbConnect from "@/lib/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product"
import { getServerSession } from "next-auth"
import Stripe from "stripe"
import { authOptions } from "./auth/[...nextauth]"

async function handler(req, res) {
  const { method } = req

  if (method !== "POST") {
    res.json("Should be a post request!")
    return
  }
  try {
    await dbConnect()
    const stripe = new Stripe(process.env.STRIPE_SK)

    const {
      fName,
      lName,
      email,
      city,
      postalCode,
      street,
      country,
      cartItems,
    } = req.body

    const uniqueIds = [...new Set(cartItems)]
    const productsInfo = await Product.find({ _id: uniqueIds })

    let line_items = []

    for (const productId of uniqueIds) {
      const prodInfo = productsInfo.find((p) => p._id.toString() === productId)
      const quantity = cartItems.filter((id) => id === productId)?.length
      if (quantity > 0 && prodInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "AUD",
            product_data: {
              name: prodInfo.title,
            },
            unit_amount: prodInfo.price * 100,
          },
        })
      }
    }

    const session = await getServerSession(req, res, authOptions)

    try {
      const order = await Order.create({
        line_items,
        fName,
        lName,
        email: email,
        city,
        postalCode,
        street,
        country,
        paid: false,
        userEmail: session?.user?.email,
      })
      const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: email,
        success_url: process.env.CLIENT_URL + "/cart?success=true",
        cancel_url: process.env.CLIENT_URL + "/cart?success=false",
        metadata: { orderId: order._id.toString() },
      })

      res.json({ url: stripeSession.url })
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export default handler
