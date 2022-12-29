import * as React from "react"
import {  graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

// const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

export default ({ data }) => {
  return (
  <Layout>
    <div className={styles.textCenter}>
      <h1>Angel's thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map((node) => (
          <div key={node.node.id }>
              <span>{node.node.frontmatter.title} - {node.node.frontmatter.date}</span>
              <p>{node.node.excerpt}</p>
            </div>
        ))
      }
    </div>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query MyQuery {
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        html
        excerpt
      }
    }
  }
}
`