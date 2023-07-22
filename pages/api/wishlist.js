import dbConnect from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import Wishlist from "@/models/Wishlist"
import Product from "@/models/Product"

const getWishlistProds = async (req, res) => {
  try {
    const { user } = await getServerSession(req, res, authOptions)

    const wishedProducts = await Wishlist.find({
      userEmail: user.email,
    }).populate({ path: "product", model: Product })

    res.json(wishedProducts)
  } catch (error) {
    res.send(error.message)
  }
}

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
      await Wishlist.create({ userEmail: user.email, product })
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
    case "GET":
      await getWishlistProds(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
