import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import * as styles from "../components/index.module.css"

export default ({ data }) => {
    const post = data.markdownRemark;
    const publishedDate = new Date(post.frontmatter.date).toLocaleDateString()
    return (
        <Layout>
           
                <h1>{post.frontmatter.title} - {publishedDate}</h1>
                <Link to={`../tags/${post.frontmatter.tags}`} className={styles.taggy}>
                    {post.frontmatter.tags}
                    </Link>
                <div className={styles.postContentContainer} dangerouslySetInnerHTML={{ __html: post.html}} />
        </Layout>
    )
    }


export const query = graphql`
    query($slug: String!) {
        markdownRemark( fields: { slug: { eq: $slug }}) {
            html
            frontmatter {
                title
                tags
                date
            }
        }
    }
`