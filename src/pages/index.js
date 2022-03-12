import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import App from "../components/app"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <App />
  </Layout>
)

export default IndexPage
