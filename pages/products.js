import Layout from "@/components/Layout"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"

const Products = ({ products }) => {
  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <h2 className="text-4xl mb-8 font-[600] md:text-center">
          All Products
        </h2>
        <ProductsGrid products={products} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const products = await Product.find({}, null, { sort: { _id: -1 } })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
export default Products
