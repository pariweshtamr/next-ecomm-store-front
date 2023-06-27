import Image from "next/image"
import CartIcon from "./icons/CartIcon"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addItemToCartAction } from "@/redux/cart/cartAction"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { _id, title, price, images } = product

  const handleAddToCart = () => {
    dispatch(addItemToCartAction(product))
  }
  return (
    <div className="flex flex-col items-center w-[250px] gap-4 md:w-[70%] xs:w-full">
      <div className="relative bg-white h-[250px] w-[250px] md:h-[160px] md:w-[160px] rounded-lg flex items-center justify-center hover:shadow-lg">
        <button
          data-tooltip-target="tooltip-default"
          type="button"
          className="absolute right-4 top-4 cursor-pointer text-[#efefef] hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
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
