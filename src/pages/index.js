import * as React from "react"
import {  graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

// const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const BlogLink = styled(Link)`
  text-decoration: none;
  background: -webkit-linear-gradient(#eee, #333);
`

const BlogTitle = styled.h2`
  margin-bottom: 20px;
  background: -webkit-linear-gradient(#94bbe9, #d88cd9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default ({ data }) => {
  return (
  <Layout>
    <div className={styles.textCenter}>
      {
        data.allMarkdownRemark.edges.map((node) => (
          <div key={node.node.id }>
            <BlogLink to={node.node.fields.slug}>
              <BlogTitle>{node.node.frontmatter.title}</BlogTitle>
              </BlogLink>
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
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`