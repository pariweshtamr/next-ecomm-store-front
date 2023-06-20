import Layout from "@/components/Layout"
import ProductImages from "@/components/ProductImages"
import CartIcon from "@/components/icons/CartIcon"
import dbConnect from "@/lib/mongoose"
import Product from "@/models/Product"
import { addItemToCartAction } from "@/redux/cart/cartAction"
import { useDispatch } from "react-redux"
import FlyingButton from "react-flying-item"

const ProductPage = ({ product }) => {
  const dispatch = useDispatch()
  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10">
        <div className="grid grid-cols-1 min-md:grid-cols-2 gap-16">
          <div className="rounded-md bg-white p-4">
            <ProductImages images={product.images} />
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-[600] md:text-center">
              {product.title}
            </h2>
            <p>{product.desc}</p>

            <div className="flex items-center gap-[20px] md:justify-center md:gap-[30px]">
              <h3 className="text-4xl">${product.price}</h3>
              <FlyingButton
                src={product.images?.[0]}
                targetTop="5%"
                targetLeft="90%"
                flyingItemStyling={{
                  borderRadius: "0",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
              >
                <span
                  className="btn-success flex items-center gap-2"
                  onClick={() => dispatch(addItemToCartAction(product._id))}
                >
                  <CartIcon />
                  Add to cart
                </span>
              </FlyingButton>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
  const { id } = context.query

  const product = await Product.findById(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}

export default ProductPage
