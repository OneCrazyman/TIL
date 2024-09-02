import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"; // useLocation 훅을 추가
import Sidebar from "./sidebar";
import "./layout.css" // Import the CSS for sidebar
import Bio from './bio'

const Layout = ({ title, children }) => {
  const location = useLocation(); // useLocation 훅으로 location 객체를 얻는다.
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h1 className="main-heading">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      </h1>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <Bio />
      <div className="content-wrapper">
        <Sidebar/>
        <main>{children}</main>
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout