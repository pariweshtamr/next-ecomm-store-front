import ProductsGrid from "./ProductsGrid"

const NewProducts = ({ products }) => {
  return (
    <div className="w-[85%] m-[0_auto] py-20 max-w-[1440px]">
      <h2 className="text-4xl mb-8 font-[600] md:text-center">New Arrivals</h2>
      <ProductsGrid products={products} />
    </div>
  )
}
export default NewProducts
