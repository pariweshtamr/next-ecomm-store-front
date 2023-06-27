import Layout from "@/components/Layout"
import { signOut, useSession } from "next-auth/react"

const AccountPage = () => {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="w-[85%] m-[0_auto] py-10 max-w-[1440px]">
        <h2 className="title">Account</h2>
        {!session && (
          <button className="btn-secondary" onClick={() => signOut()}>
            Logout
          </button>
        )}
      </div>
    </Layout>
  )
}
export default AccountPage
