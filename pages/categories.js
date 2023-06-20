import Layout from "@/components/Layout"
import ProductCard from "@/components/ProductCard"
import dbConnect from "@/lib/mongoose"
import Category from "@/models/Category"
import Product from "@/models/Product"
import Link from "next/link"

const Categories = ({ mainCategories, categoryProducts }) => {
  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        {mainCategories?.map((category) => (
          <div key={category._id} className="mb-12">
            <h2 className="subtitle">{category.name}</h2>
            <div className="grid grid-cols-2 min-md:grid-cols-4">
              {categoryProducts[category._id].map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
              <Link
                href={`/category/${category._id}`}
                className="bg-[#ddd] w-[250px] h-[250px] flex items-center justify-center rounded-md text-xl text-[#888] hover:text-black hover:shadow-lg"
              >
                Show all &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const categories = await Category.find()
  const mainCategories = categories.filter((c) => !c.parent)
  const categoryProducts = {} // catId => [products]
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString()
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString())
    const categoriesIds = [mainCatId, ...childCatIds]
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 4,
      sort: { _id: -1 },
    })
    categoryProducts[mainCat._id] = products
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  }
}
export default Categories
