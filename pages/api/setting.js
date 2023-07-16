import dbConnect from "@/lib/mongoose"
import Setting from "@/models/Setting"

const getSetting = async (req, res) => {
  const { name } = req.query
  try {
    const setting = await Setting.findOne({ name })
    if (setting?._id) {
      return res.json(setting)
    }
    res.json({ status: "error", message: "Unable to get setting!" })
  } catch (error) {
    res.send(error.message)
  }
}

export async function handler(req, res) {
  await dbConnect()

  const { method } = req

  switch (method) {
    case "GET":
      await getSetting(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler
