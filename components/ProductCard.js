import Image from "next/image"
import CartIcon from "./icons/CartIcon"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addItemToCartAction } from "@/redux/cart/cartAction"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { _id, title, price, images } = product
  return (
    <div className="flex flex-col items-center gap-4 md:w-[60%]">
      <Link
        href={`/product/${_id}`}
        className="bg-white p-6 h-[250px] md:h-[160px] md:w-[160px] flex items-center justify-center rounded-lg"
      >
        <Image
          src={images[0]}
          alt="prod-img"
          className="w-full max-h-full h-full"
          width={500}
          height={500}
        />
      </Link>
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
            onClick={() => dispatch(addItemToCartAction(product._id))}
          >
            <CartIcon /> Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
