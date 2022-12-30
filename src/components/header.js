import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      background: "rgb(34,56,195)",
      background:
        "linear-gradient(0deg, rgba(34,56,195,1) 0%, rgba(143,129,241,1) 100%)",
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
        color: "white",
      }}
    >
      {siteTitle}
    </Link>
  </header>
)

export default Header
