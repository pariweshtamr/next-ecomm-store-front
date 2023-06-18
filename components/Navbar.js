import Link from "next/link"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const inactiveLink = "text-[#aaa]"
  return (
    <header className="bg-[#222] text-white ">
      <div className="flex justify-between w-[85%] m-[0_auto] py-6">
        <Link href={"/"}>P&apos;Tech STore</Link>
        <nav className="flex gap-8">
          <Link href={"/"} className={inactiveLink}>
            Home
          </Link>
          <Link className={inactiveLink} href={"/products"}>
            All Products
          </Link>
          <Link href={"/categories"} className={inactiveLink}>
            Categories
          </Link>
          <Link href={"/account"} className={inactiveLink}>
            Account
          </Link>
          <Link href={"/cart"} className={inactiveLink}>
            Cart ({cartItems?.length})
          </Link>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
