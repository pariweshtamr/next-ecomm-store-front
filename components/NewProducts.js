import ProductsGrid from "./ProductsGrid"

const NewProducts = ({ products, wishedProducts }) => {
  return (
    <div className="w-[85%] m-[0_auto] py-20 max-w-[1440px]">
      <h2 className="title">New Arrivals</h2>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </div>
  )
}
export default NewProducts
