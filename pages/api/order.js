import dbConnect from "@/lib/mongoose"
import Order from "@/models/Order"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

const getAllOrders = async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)

  const orders = await Order.find({ userEmail: user.email })
  console.log(orders)
  res.json(orders)
}

async function handler(req, res) {
  await dbConnect()
  const { method } = req

  switch (method) {
    case "GET":
      await getAllOrders(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
