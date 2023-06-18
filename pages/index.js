import Featured from "@/components/Featured"
import Layout from "@/components/Layout"
import NewProducts from "@/components/NewProducts"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"

export default function Home({ featureProduct, newProducts }) {
  return (
    <Layout>
      <Featured product={featureProduct} />
      <NewProducts products={newProducts} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "648d492d9c2ada7f421841f6"
  await dbConnect()
  const featureProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {
    sort: { createdAt: -1 },
    limit: 8,
  })
  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}
