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

const getFilteredProducts = async (req, res) => {
  const { categories, sort, searchTerm, ...filters } = req.query
  let [sortField, sortOrder] = (sort || "_id-desc").split("-")

  const productsQuery = {}
  if (categories) {
    productsQuery.category = categories.split(",")
  }

  if (searchTerm) {
    productsQuery["$or"] = [
      { title: { $regex: searchTerm, $options: "i" } },
      { desc: { $regex: searchTerm, $options: "i" } },
    ]
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery[`properties.${filterName}`] = filters[filterName]
    })
  }
  try {
    const products = await Product.find(productsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
    res.json(products)
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
    case "GET":
      await getFilteredProducts(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
