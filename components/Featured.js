import Image from "next/image"
import img1 from "/public/imgs/m1.png"
import Link from "next/link"
import CartIcon from "./icons/CartIcon"
import { addItemToCartAction } from "@/redux/cart/cartAction"
import { useDispatch } from "react-redux"

const Featured = ({ product }) => {
  const dispatch = useDispatch()
  const addFeaturedToCart = () => {
    dispatch(addItemToCartAction(product._id))
  }
  return (
    <div className="bg-[#222] text-white">
      <div className="w-[85%] m-[0_auto] py-20">
        <div className="grid grid-cols-[1.2fr_1fr]">
          <div>
            <Image
              src={img1}
              width={1000}
              height={1000}
              alt="hero-img"
              className="max-w-[100%] w-[80%]"
            />
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="font-normal text-6xl mb-5">{product.title}</h1>
              <p className="text-[#aaa] text-sm first-letter:capitalize">
                {product.desc}
              </p>
              <div className="mt-8 flex gap-2">
                <Link href={`/products/${product._id}`}>
                  <button className="btn-transparent">Read more</button>
                </Link>
                <button
                  className="btn-success flex items-center gap-2"
                  onClick={addFeaturedToCart}
                >
                  <CartIcon />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Featured
