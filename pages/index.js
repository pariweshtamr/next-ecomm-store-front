import Featured from "@/components/Featured"
import Layout from "@/components/Layout"
import NewProducts from "@/components/NewProducts"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"
import Wishlist from "@/models/Wishlist"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const Home = ({ featureProduct, newProducts, wishedNewProducts }) => {
  return (
    <Layout>
      <Featured product={featureProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const featuredProductId = "648d492d9c2ada7f421841f6"
  await dbConnect()
  const featureProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {
    sort: { createdAt: -1 },
    limit: 8,
  })

  const { user } = await getServerSession(ctx.req, ctx.res, authOptions)
  const wishedNewProducts = await Wishlist.find({
    userEmail: user.email,
    product: newProducts.map((p) => p._id.toString()),
  })

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  }
}

export default Home
