import { RevealWrapper } from "next-reveal"
import ProductCard from "./ProductCard"

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-y-16 place-items-center min-lg:grid-cols-3 min-xl:!grid-cols-4 xs:grid-cols-1 ">
      {products?.length > 0 &&
        products?.map((product, index) => (
          <RevealWrapper delay={index * 50} key={product._id}>
            <ProductCard product={product} />
          </RevealWrapper>
        ))}
    </div>
  )
}
export default ProductsGrid
