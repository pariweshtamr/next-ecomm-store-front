import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"

const getCartProducts = async (req, res) => {
  const { ids } = req.body

  try {
    const cartProducts = await Product.find({ _id: ids })
    res.json({ status: "success", cartProducts })
  } catch (error) {
    res.send(error)
  }
}

async function handler(req, res) {
  await dbConnect()
  const { method } = req

  switch (method) {
    case "POST":
      await getCartProducts(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
