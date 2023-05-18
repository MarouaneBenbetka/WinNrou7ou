import '@/styles/globals.css'
import Layout from '../components/shared/Layout.jsx'

export default function App({ Component, pageProps }) {
  return(
  <Layout>
  <Component {...pageProps} />
</Layout>)
}
