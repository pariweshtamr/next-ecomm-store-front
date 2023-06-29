import dbConnect from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import Customer from "@/models/Customer"

const getCustomerInfo = async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)
  const customer = await Customer.findOne({ userEmail: user.email })
  if (!customer._id) {
    return res.json({
      status: "error",
      message: "User not found!",
    })
  }

  res.json({
    status: "success",
    customer,
  })
}

const saveCustomerInfo = async (req, res) => {
  const { user } = await getServerSession(req, res, authOptions)
  const customer = await Customer.findOne({ userEmail: user.email })
  if (customer) {
    const existingCustomer = await Customer.findById(customer._id, req.body)
    res.json({ status: "success", existingCustomer })
  } else {
    const newCustomer = await Customer.create({
      userEmail: user.email,
      ...req.body,
    })

    res.json({ status: "success", newCustomer })
  }
}

async function handler(req, res) {
  await dbConnect()
  const { method } = req
  switch (method) {
    case "GET":
      await getCustomerInfo(req, res)
      break
    case "PUT":
      await saveCustomerInfo(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
