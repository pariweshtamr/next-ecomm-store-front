import Layout from "@/components/Layout"
import ProductsGrid from "@/components/ProductsGrid"
import Spinner from "@/components/Spinner"
import { getAllProducts } from "@/lib/axiosHelper"
import dbConnect from "@/lib/mongoose"
import Category from "@/models/Category"
import Product from "@/models/Product"
import { useEffect, useState } from "react"

const SingleCategory = ({
  category,
  subCategories,
  products: originalProducts,
}) => {
  const defaultFilterValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }))
  const defaultSorting = "_id-asc"
  const [products, setProducts] = useState(originalProducts)
  const [filterValues, setFilterValues] = useState(defaultFilterValues)
  const [sort, setSort] = useState(defaultSorting)
  const [loadingProducts, setIsLoadingProducts] = useState(false)
  const [filtersChanged, setFiltersChanged] = useState(false)

  const handleFilterChange = (filterName, filterValue) => {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }))
    })
    setFiltersChanged(true)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
    setFiltersChanged(true)
  }

  useEffect(() => {
    if (!filtersChanged) return
    setIsLoadingProducts(true)
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])]
    const params = new URLSearchParams()
    params.set("categories", catIds.join(","))
    params.set("sort", sort)
    filterValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value)
      }
    })
    const fetchProducts = async () => {
      const prods = await getAllProducts(params.toString())
      setProducts(prods)
      setTimeout(() => {
        setIsLoadingProducts(false)
      }, 1000)
    }
    fetchProducts()
  }, [
    filterValues,
    subCategories,
    category._id,
    originalProducts,
    sort,
    filtersChanged,
  ])

  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <h2 className="title">{category.name}</h2>
        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="flex items-center gap-5">
            <span className="font-bold">Filter:</span>
            {category.properties.map((prop) => (
              <div
                key={prop.name}
                className="flex items-center gap-2 text-[#444] bg-[#ddd] p-[5px_10px] rounded-md"
              >
                <label className="font-[500] capitalize">{prop.name}:</label>
                <select
                  value={filterValues.find((f) => f.name === prop.name).value}
                  className="basic"
                  onChange={(e) =>
                    handleFilterChange(prop.name, e.target.value)
                  }
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="font-bold">Sort:</span>
            <div className="flex items-center gap-2 text-[#444] bg-[#ddd] p-[5px_10px] rounded-md">
              <select
                className="basic"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="price-asc">Price (lowest first)</option>
                <option value="price-desc">Price (highest first)</option>
                <option value="_id-asc">newest first</option>
                <option value="_id-desc">oldest first</option>
              </select>
            </div>
          </div>
        </div>
        {loadingProducts && <Spinner />}
        {!loadingProducts && !products?.length && (
          <div className="w-full flex justify-center py-10">
            <h1>No products found!</h1>
          </div>
        )}
        {!loadingProducts && <ProductsGrid products={products} />}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
  const { id } = context.query
  const category = await Category.findById(id)
  const subCategories = await Category.find({ parent: category._id })
  const catIds = [category._id, ...subCategories.map((c) => c._id)]
  const products = await Product.find({ category: catIds }, null, {
    sort: { _id: -1 },
  })
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
export default SingleCategory
