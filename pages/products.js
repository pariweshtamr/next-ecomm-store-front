import Layout from "@/components/Layout"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"
import Wishlist from "@/models/Wishlist"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const Products = ({ products, wishedProducts }) => {
  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <h2 className="title">All Products</h2>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  await dbConnect()
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const products = await Product.find({}, null, { sort: { _id: -1 } })
  const wishedProducts = session?.user
    ? await Wishlist.find({
        userEmail: session?.user?.email,
        product: products.map((p) => p._id.toString()),
      })
    : []
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  }
}
export default Products
