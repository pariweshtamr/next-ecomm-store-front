import Featured from "@/components/Featured"
import Layout from "@/components/Layout"
import NewProducts from "@/components/NewProducts"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"
import Wishlist from "@/models/Wishlist"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import Setting from "@/models/Setting"

const Home = ({ featureProduct, newProducts, wishedNewProducts }) => {
  return (
    <Layout>
      <Featured product={featureProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  await dbConnect()
  const featuredProductSetting = await Setting.findOne({
    name: "featuredProductId",
  })
  const featuredProductId = featuredProductSetting.value
  const featureProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {
    sort: { createdAt: -1 },
    limit: 8,
  })

  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  const wishedNewProducts = session?.user
    ? await Wishlist.find({
        userEmail: session?.user?.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : []

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  }
}

export default Home
