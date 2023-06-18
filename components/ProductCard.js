import Image from "next/image"
import CartIcon from "./icons/CartIcon"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addItemToCartAction } from "@/redux/cart/cartAction"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { _id, title, desc, price, images } = product
  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/products/${_id}`}
        className="bg-white p-6 h-[250px] flex items-center justify-center rounded-lg"
      >
        <Image
          src={images[0]}
          alt="prod-img"
          className="w-full max-h-full h-full"
          width={500}
          height={500}
        />
      </Link>
      <div className="flex flex-col gap-3">
        <Link
          href={`/products/${_id}`}
          className="text-center text-lg font-[500]"
        >
          {title}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-[600]">${price}</div>
          <button
            className="btn-cart flex gap-2 items-center"
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
