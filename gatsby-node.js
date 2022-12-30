/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const tagTemplate = path.resolve("src/templates/tags.js")
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { frontmatter: { date: DESC }}
        limit: 200
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 200) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
        }
      }
    }
  `)

  if(result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  console.log(result.data.postsRemark)

  const posts = result.data.postsRemark.edges

  posts.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug
      }
    })
  })

  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      }
    })
  })
  
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if(node.internal.type == `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode})

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}