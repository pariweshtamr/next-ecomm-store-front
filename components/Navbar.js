import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const [active, setActive] = useState(false)
  const { pathname } = useRouter()
  const inactiveLink = "text-[#aaa] hover:text-white"
  const activeLink = "underline"
  return (
    <header className="bg-[#222] text-white">
      <div className="flex justify-between w-[85%] max-w-[1440px] m-[0_auto] py-6">
        <Link href={"/"}>P&apos;Tech STore</Link>

        <nav className="flex gap-8 md:hidden">
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            Home
          </Link>
          <Link
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
            href={"/products"}
          >
            All Products
          </Link>
          <Link
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            href={"/account"}
            className={
              pathname.includes("/account") ? activeLink : inactiveLink
            }
          >
            Account
          </Link>
          <Link
            href={"/cart"}
            className={pathname.includes("/cart") ? activeLink : inactiveLink}
          >
            Cart ({cartItems?.length})
          </Link>
        </nav>

        <nav
          className={`
            ${
              active
                ? "flex flex-col justify-center items-center gap-5 text-2xl bg-[#222] fixed top-0 bottom-0 left-0 right-0 transition-all z-50"
                : "hidden"
            } min-md:hidden 
          `}
        >
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            Home
          </Link>
          <Link
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
            href={"/products"}
          >
            All Products
          </Link>
          <Link
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            href={"/account"}
            className={
              pathname.includes("/account") ? activeLink : inactiveLink
            }
          >
            Account
          </Link>
          <Link
            href={"/cart"}
            className={pathname.includes("/cart") ? activeLink : inactiveLink}
          >
            Cart ({cartItems?.length})
          </Link>
        </nav>

        {active ? (
          <button
            className="cursor-pointer hidden md:block z-50 fixed right-10"
            onClick={() => setActive((prev) => false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-[#aaa] hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button
            className="cursor-pointer hidden md:block z-50"
            onClick={() => setActive((prev) => true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}
export default Navbar
