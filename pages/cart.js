import Layout from "@/components/Layout"
import { getProducts, getShippingFee, handleCheckout } from "@/lib/axiosHelper"
import {
  addItemToCartAction,
  removeItemFromCartAction,
} from "@/redux/cart/cartAction"
import { emptyCart } from "@/redux/cart/cartSlice"
import { RevealWrapper } from "next-reveal"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [products, setProducts] = useState([])
  const [shippingFee, setShippingFee] = useState("")
  const { query } = useRouter()
  const fNameRef = useRef()
  const lNameRef = useRef()
  const emailRef = useRef()
  const cityRef = useRef()
  const postalRef = useRef()
  const streetRef = useRef()
  const countryRef = useRef()

  useEffect(() => {
    if (cartItems?.length > 0) {
      const fetchProds = async () => {
        const { cartProducts } = await getProducts({ ids: cartItems })

        setProducts(cartProducts)
      }
      fetchProds()
    } else {
      setProducts([])
    }
  }, [cartItems])

  useEffect(() => {
    const fetchShippingSetting = async () => {
      const shipping = await getShippingFee("shippingFee")
      setShippingFee(shipping.value)
    }
    fetchShippingSetting()
  }, [])

  useEffect(() => {
    if (query?.success === "true") {
      dispatch(emptyCart())
    }
  }, [dispatch, query?.success])

  const moreOfThisProduct = (id) => {
    dispatch(addItemToCartAction(id))
  }

  const lessOfThisProduct = (id) => {
    dispatch(removeItemFromCartAction(id))
  }

  let productsTotal = 0
  for (const productId of cartItems) {
    const price = products.find((p) => p._id === productId)?.price || 0

    productsTotal += price
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fName = fNameRef?.current?.value
    const lName = lNameRef?.current?.value
    const email = emailRef?.current?.value
    const city = cityRef?.current?.value
    const postalCode = postalRef?.current?.value
    const street = streetRef?.current?.value
    const country = countryRef?.current?.value

    const { url } = await handleCheckout({
      fName,
      lName,
      email,
      city,
      postalCode,
      street,
      country,
      cartItems,
    })

    if (url) {
      window.location = url
    }
  }

  if (query.success === "true") {
    return (
      <Layout>
        <div className="w-[85%] m-[0_auto] py-20">
          <RevealWrapper
            origin="bottom"
            className="bg-success rounded-md p-8 w-full text-center"
          >
            <h1 className="text-4xl font-bold mb-2">
              Thank you for your order!
            </h1>
            <p className="text-gray-500">
              We will email you when your order has been dispatched!
            </p>

            <Link href="/products" className="underline">
              Continue Shopping
            </Link>
          </RevealWrapper>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 sm:w-[95%]">
        {!cartItems?.length ? (
          <RevealWrapper origin="left" className="bg-white rounded-md p-8">
            <h2 className="title">Cart</h2>
            <div>Your cart is empty!</div>
          </RevealWrapper>
        ) : (
          <>
            <div className="grid grid-cols-[1.3fr_0.7fr] gap-10 lg:grid-cols-1">
              <RevealWrapper
                origin="left"
                className="bg-white rounded-md p-8 h-max sm:p-4"
              >
                <h2 className="title">Cart</h2>
                {products?.length > 0 && (
                  <table className="basic">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Qty</th>
                        <th className="!text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product?._id}>
                          <td>
                            <div className="w-[120px] h-[120px] border border-solid border-[rgba(0,0,0,0.1)] rounded-md flex items-center justify-center md:w-[70px] md:h-[70px]">
                              <Image
                                src={product.images[0]}
                                alt="pro-img"
                                className="max-w-[90px] max-h-[90px] md:max-w-[60px] md:max-h-[60px]"
                                width={1000}
                                height={1000}
                              />
                            </div>
                          </td>
                          <td>{product.title}</td>
                          <td className="sm:flex sm:flex-col sm:justify-center sm:items-start sm:gap-2">
                            <button
                              className="btn-secondary "
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              -
                            </button>
                            <span className="px-3 sm:px-0 sm:self-center">
                              {
                                cartItems.filter((id) => id === product._id)
                                  .length
                              }
                            </span>
                            <button
                              className="btn-success"
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </button>
                          </td>
                          <td className="text-right">
                            $
                            {cartItems.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td colSpan={3}>Products</td>
                        <td className="text-right text-[20px]">
                          ${productsTotal}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>Shipping</td>
                        <td className="text-right text-[20px]">
                          ${shippingFee}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold uppercase" colSpan={3}>
                          Total
                        </td>
                        <td className="font-bold text-right text-[20px]">
                          ${productsTotal + +shippingFee}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <p className="text-center mt-5 text-sm">
                  <i>
                    <strong>Note:</strong>
                  </i>{" "}
                  <span className=" text-gray-600">
                    Promotional codes can be applied at the payment page.
                  </span>
                </p>
              </RevealWrapper>

              {!!cartItems?.length && (
                <RevealWrapper
                  origin="right"
                  className="bg-white rounded-md p-8 h-max sm:p-4"
                >
                  <h2 className="font-bold text-3xl mb-5 text-center">
                    Order Information
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name=""
                        ref={fNameRef}
                        className="basic"
                        placeholder="First name"
                      />
                      <input
                        type="text"
                        name=""
                        ref={lNameRef}
                        className="basic"
                        placeholder="Last name"
                      />
                    </div>
                    <input
                      type="email"
                      name=""
                      ref={emailRef}
                      className="basic"
                      placeholder="Email"
                    />
                    <div className="flex gap-2">
                      <input type="text" placeholder="City" ref={cityRef} />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        ref={postalRef}
                      />
                    </div>
                    <input type="text" placeholder="Street" ref={streetRef} />
                    <input type="text" placeholder="Country" ref={countryRef} />
                    <button
                      className="btn-success w-full !bg-[#222] !text-white mt-3"
                      type="submit"
                    >
                      Continue to payment
                    </button>
                  </form>
                </RevealWrapper>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Cart
