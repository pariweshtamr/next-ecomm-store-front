import ProductCard from "./ProductCard"

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-y-16 place-items-center min-lg:grid-cols-3 min-xl:!grid-cols-4 xs:grid-cols-1">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
export default ProductsGrid
