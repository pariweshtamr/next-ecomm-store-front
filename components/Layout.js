import { useDispatch } from "react-redux"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { setInitialCart } from "@/redux/cart/cartSlice"

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart"))
    if (existingCart?.length > 0) {
      dispatch(setInitialCart(existingCart))
    }
  }, [dispatch])
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}
export default Layout
