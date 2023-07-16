import Image from "next/image"
import Link from "next/link"
import CartIcon from "./icons/CartIcon"
import { addItemToCartAction } from "@/redux/cart/cartAction"
import { useDispatch } from "react-redux"
import { RevealWrapper } from "next-reveal"
import { useRef } from "react"

const Featured = ({ product }) => {
  const dispatch = useDispatch()
  const btnRef = useRef()

  const addFeaturedToCart = () => {
    dispatch(addItemToCartAction(product))
  }

  return (
    <div className="bg-[#222] text-white">
      <div className="w-[85%] m-[0_auto] py-20 max-w-[1440px]">
        <div className="grid grid-cols-[1fr_1.2fr] lg:grid-cols-1 lg:place-items-center lg:gap-10">
          <div className="flex justify-center w-full">
            <RevealWrapper delay={0} origin="left" className="w-full">
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={product.images?.[0]}
                  width={1000}
                  height={1000}
                  alt="hero-img"
                  className="max-w-[100%] w-[70%] md:w-full"
                />
              </div>
            </RevealWrapper>
          </div>
          <div className="flex items-center lg:text-center">
            <div>
              <RevealWrapper origin="right" delay={0}>
                <h1 className="font-normal text-5xl mb-8 sm:text-2xl">
                  {product.title}
                </h1>
                <p className="text-[#aaa] text-sm first-letter:capitalize">
                  {product.desc}
                </p>
              </RevealWrapper>
              <div className="mt-8 flex gap-2 lg:gap-4 lg:justify-center">
                <Link href={`/products/${product._id}`}>
                  <button className="btn-transparent">Read more</button>
                </Link>

                <button
                  className="btn-success flex items-center gap-2"
                  onClick={addFeaturedToCart}
                  ref={btnRef}
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
