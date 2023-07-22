import Layout from "@/components/Layout"
import ProductCard from "@/components/ProductCard"
import SingleOrder from "@/components/SingleOrder"
import Spinner from "@/components/Spinner"
import Tabs from "@/components/Tabs"
import {
  addCustomerInfo,
  getAllOrders,
  getCustomerInfo,
  getProdsOnWishList,
} from "@/lib/axiosHelper"
import { signIn, signOut, useSession } from "next-auth/react"
import { RevealWrapper } from "next-reveal"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"

const AccountPage = () => {
  const { data: session } = useSession()
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [detailsLoaded, setDetailsLoaded] = useState(true)
  const [wishlistLoaded, setWishlistLoaded] = useState(true)
  const [wishedProducts, setWishedProducts] = useState([])
  const [ordersLoaded, setOrdersLoaded] = useState(true)
  const [orderedProducts, setOrderedProducts] = useState([])
  const [activeTab, setActiveTab] = useState("Orders")

  useEffect(() => {
    if (!session) return

    setDetailsLoaded(false)
    setWishlistLoaded(false)
    setOrdersLoaded(false)

    const fetchCustomerInfo = async () => {
      const { customer } = await getCustomerInfo()
      if (!customer?._id) {
        setDetailsLoaded(true)
        return
      }
      setFName(customer?.fName)
      setLName(customer?.lName)
      setEmail(customer?.email)
      setCity(customer?.city)
      setCountry(customer?.country)
      setStreet(customer?.street)
      setPostalCode(customer?.postalCode)
      setDetailsLoaded(true)
    }

    const fetchWishedProducts = async () => {
      const products = await getProdsOnWishList()
      setWishedProducts(products?.map((p) => p.product))
      setWishlistLoaded(true)
    }

    const fetchAllOrders = async () => {
      const orders = await getAllOrders()
      setOrderedProducts(orders)
      setOrdersLoaded(true)
    }
    fetchCustomerInfo()
    fetchWishedProducts()
    fetchAllOrders()
  }, [session])

  const saveCustomerInfo = async (e) => {
    e.preventDefault()
    const data = { fName, lName, email, city, street, postalCode, country }
    const { status } = await addCustomerInfo(data)

    if (status === "success") {
      toast.success("Your details have been updated!", {
        position: "top-right",
      })
    }
  }

  const login = async () => {
    await signIn("google")
  }

  const productRemovedFromWishlist = (idToRemove) => {
    setWishedProducts((products) => {
      return [...products].filter(
        (product) => product._id.toString() !== idToRemove
      )
    })
  }

  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-10 md:grid-cols-1">
          <RevealWrapper
            origin="left"
            className="bg-white rounded-md p-8 md:order-2 sm:p-4 h-max"
          >
            <h2 className="title">
              <Tabs
                tabs={["Wishlist", "Orders"]}
                active={activeTab}
                onChange={setActiveTab}
              />
            </h2>

            {activeTab === "Wishlist" ? (
              <>
                {!wishlistLoaded && <Spinner />}
                {wishlistLoaded && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-1 place-items-center gap-y-12">
                      {wishedProducts.length > 0 &&
                        wishedProducts.map((product) => (
                          <ProductCard
                            key={product._id}
                            onChange={productRemovedFromWishlist}
                            product={product}
                            wishedProduct={true}
                          />
                        ))}
                    </div>
                    {wishedProducts.length === 0 && (
                      <>
                        {session ? (
                          <p className="md:text-center">
                            Your wishlist is empty!
                          </p>
                        ) : (
                          <p className="md:text-center">
                            Login to add products to your wish list!
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {!ordersLoaded && <Spinner />}
                {ordersLoaded && (
                  <>
                    {orderedProducts?.length === 0 && (
                      <p>Login to see your orders!</p>
                    )}
                    <div>
                      {orderedProducts?.length > 0 &&
                        orderedProducts.map((order) => (
                          <SingleOrder key={order._id} {...order} />
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
          </RevealWrapper>

          <RevealWrapper
            origin="right"
            className="bg-white rounded-md p-8 sm:p-8 h-max"
          >
            <h2 className="title">{session ? "Account Details" : "Login"}</h2>
            {!detailsLoaded && <Spinner />}
            {detailsLoaded && session ? (
              <>
                <form onSubmit={saveCustomerInfo}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="fName"
                      className="basic"
                      placeholder="First name"
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                    />
                    <input
                      type="text"
                      name="lName"
                      className="basic"
                      placeholder="Last name"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="basic"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <button
                    className="btn-success w-full !bg-[#222] !text-white mt-3"
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </>
            ) : (
              <div className="flex justify-center">
                <button
                  className="btn-primary flex items-center gap-2"
                  onClick={login}
                >
                  <FcGoogle size={24} />
                  <span className="font-[500]">Continue with Google</span>
                </button>
              </div>
            )}
          </RevealWrapper>
        </div>
      </div>
    </Layout>
  )
}

export default AccountPage
