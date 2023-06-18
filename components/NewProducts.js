import ProductCard from "./ProductCard"

const NewProducts = ({ products }) => {
  return (
    <div className="w-[85%] m-[0_auto] py-20">
      <h2 className="text-4xl mb-8 font-[600]">New Arrivals</h2>
      <div className="grid grid-cols-4 gap-y-16 place-items-center">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
export default NewProducts
