import store from "@/store"
import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            // Define default options
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
