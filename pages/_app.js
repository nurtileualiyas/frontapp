import '@/styles/globals.scss'
import { LayoutProvider } from '../layout/context/layoutcontext'
import Layout from '../layout/layout'


import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import '@/styles/layout/layout.scss'

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {

    return Component.getLayout(

      <Component {...pageProps} />

    )

  } else {
    return (
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    )
  }
}
