import Image from "next/image"
import CartIcon from "./icons/CartIcon"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addItemToCartAction } from "@/redux/cart/cartAction"
import HeartIcon from "./icons/HeartIcon"
import { useState } from "react"
import { addProdToWishlist } from "@/lib/axiosHelper"

const ProductCard = ({ product, wishedProduct = false }) => {
  const dispatch = useDispatch()
  const [inWishList, setInWishList] = useState(wishedProduct)
  const { _id, title, price, images } = product

  const handleAddToCart = () => {
    dispatch(addItemToCartAction(product))
  }

  const addToWishlist = async () => {
    const nextValue = !inWishList
    await addProdToWishlist({ product: _id })
    setInWishList(nextValue)
  }

  return (
    <div className="flex flex-col items-center w-[250px] gap-4 md:w-[100%] xs:w-full">
      <div className="relative bg-white h-[250px] w-[250px] md:h-[160px] md:w-[160px] rounded-lg flex items-center justify-center hover:shadow-lg">
        <button
          data-tooltip-target="tooltip-default"
          type="button"
          className={`${
            inWishList ? "text-red-500" : " text-[#efefef]"
          } absolute right-2 top-2 cursor-pointer`}
          onClick={addToWishlist}
        >
          <HeartIcon />
        </button>

        <Link
          href={`/product/${_id}`}
          className="p-4 h-[200px] w-[200px] md:h-[140px] md:w-[140px] flex items-center justify-center"
        >
          <Image
            src={images[0]}
            alt="prod-img"
            className="w-full max-h-full"
            width={500}
            height={500}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Link
          href={`/product/${_id}`}
          className="text-center text-lg font-[500] md:text-sm"
        >
          {title}
        </Link>
        <div className="flex items-center justify-between md:flex-col md:gap-2 md:w-full">
          <div className="text-2xl font-[600] md:text-lg">${price}</div>

          <button
            className="btn-cart flex gap-2 items-center !px-2 !py-1.5 sm:text-xs md:w-full md:justify-center"
            onClick={handleAddToCart}
          >
            <CartIcon /> Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
