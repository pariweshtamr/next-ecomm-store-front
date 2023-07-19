import dbConnect from "@/lib/mongoose"
import Review from "@/models/Review"

const addReview = async (req, res) => {
  const { title, comment, rating, product } = req.body

  const review = await Review.create({ title, comment, rating, product })

  if (review?._id) {
    return res.json({
      status: "success",
      message: "Review posted successfully!",
    })
  }
  res.json({ status: "error", message: "Unable to post your review!" })
}

const getReviews = async (req, res) => {
  const { product } = req.query

  const reviews = await Review.find({ product }, null, {
    sort: { createdAt: -1 },
  })

  res.json(reviews)
}

export async function handler(req, res) {
  await dbConnect()

  const { method } = req
  switch (method) {
    case "POST":
      await addReview(req, res)
      break
    case "GET":
      await getReviews(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
