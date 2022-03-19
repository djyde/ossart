import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from 'react-query'
import '../main.css'
import Head from 'next/head'
import Script from 'next/script'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Script async defer data-website-id="ab7698d7-586f-4972-8607-174e9eb3d1cd" src="https://a.taonan.lu/ana.js"></Script>
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}