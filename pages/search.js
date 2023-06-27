import Layout from "@/components/Layout"
import ProductsGrid from "@/components/ProductsGrid"
import Spinner from "@/components/Spinner"
import { getSearchedProducts } from "@/lib/axiosHelper"
import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const debouncedSearch = useCallback(debounce(fetchSearchedProducts, 500), [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true)
      debouncedSearch(searchTerm)
    } else {
      setProducts([])
    }
  }, [searchTerm, debouncedSearch])

  async function fetchSearchedProducts(searchTerm) {
    const prods = await getSearchedProducts(encodeURIComponent(searchTerm))
    setProducts(prods)
    setIsLoading(false)
  }

  return (
    <Layout>
      <div className="flex justify-between w-[85%] max-w-[1440px] m-[0_auto] py-6">
        <div className="m-[0_auto] w-full">
          <div className="sticky top-[72px] bg-[#F2F2F2] py-[5px]">
            <input
              type="text"
              className="p-[10px_15px] rounded-md text-xl w-full "
              placeholder="Search for products..."
              autoFocus
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          {!isLoading && searchTerm && products.length === 0 && (
            <h2>No products found for query &apos;{searchTerm}&apos;</h2>
          )}
          {isLoading && <Spinner />}
          {!isLoading && products.length > 0 && (
            <ProductsGrid products={products} />
          )}
        </div>
      </div>
    </Layout>
  )
}
export default SearchPage
