import ProductCard from "./ProductCard"

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-y-16 place-items-center md:grid-cols-2 xs:grid-cols-1">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
export default ProductsGrid
