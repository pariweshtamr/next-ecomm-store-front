import dbConnect from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import Wishlist from "@/models/Wishlist"

const addToWishlist = async (req, res) => {
  try {
    const { user } = await getServerSession(req, res, authOptions)
    const { product } = req.body
    const wishedProd = await Wishlist.findOne({
      userEmail: user.email,
      product,
    })

    if (wishedProd?._id) {
      await Wishlist.findByIdAndDelete(wishedProd._id)
      res.json("Removed from wishlist!")
    } else {
      const wish = await Wishlist.create({ userEmail: user.email, product })
      res.json("Added to wishlist!")
    }
  } catch (error) {
    res.send(error.message)
  }
}

async function handler(req, res) {
  await dbConnect()
  const { method } = req
  switch (method) {
    case "POST":
      await addToWishlist(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
