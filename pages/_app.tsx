import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
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
  const theme = extendTheme({
    fonts: {
      body: `'Roboto', sans-serif`
    }
  })
  return (
    <>
      <Script async defer data-website-id="ab7698d7-586f-4972-8607-174e9eb3d1cd" src="https://a.taonan.lu/ana.js"></Script>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />

        <meta property="og:title" content="OSS Art" />
        <meta property="og:site_name" content="OSSArt | Print your GitHub activity as an artwork" />
        <meta property="og:url" content="https://getoss.art" />
        <meta property="og:description" content="Print your GitHub activity as an artwork" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://gbstatic.djyde.com/uPic/h7JgM0.jpg?x-oss-process=style/80" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}