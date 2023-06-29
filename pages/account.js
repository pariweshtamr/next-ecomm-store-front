import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import { addCustomerInfo, getCustomerInfo } from "@/lib/axiosHelper"
import { signIn, signOut, useSession } from "next-auth/react"
import { RevealWrapper } from "next-reveal"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const AccountPage = () => {
  const { data: session } = useSession()
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const { customer } = await getCustomerInfo()
      if (!customer?._id) {
        setLoaded(true)
        return
      }

      setFName(customer?.fName)
      setLName(customer?.lName)
      setEmail(customer?.email)
      setCity(customer?.city)
      setCountry(customer?.country)
      setStreet(customer?.street)
      setPostalCode(customer?.postalCode)
      setLoaded(true)
    }
    fetchCustomerInfo()
  }, [])

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

  const logout = async () => {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_CLIENT_URL })
  }

  const login = async () => {
    await signIn("google")
  }

  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-10">
          <RevealWrapper origin="left" className="bg-white rounded-md p-8">
            <h2 className="title">Wishlist</h2>
          </RevealWrapper>

          <RevealWrapper origin="right" className="bg-white rounded-md p-8">
            <h2 className="title">Account Details</h2>
            {!loaded && <Spinner />}
            {loaded && (
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
            )}
            {session && (
              <button className="btn-secondary mt-4" onClick={logout}>
                Logout
              </button>
            )}
          </RevealWrapper>
        </div>

        {!session && (
          <button className="btn-primary" onClick={login}>
            Login
          </button>
        )}
      </div>
    </Layout>
  )
}

export default AccountPage
