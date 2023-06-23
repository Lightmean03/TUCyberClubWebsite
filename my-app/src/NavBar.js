import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
      <nav className="nav">
        <Link to="/Home" className="site-title">
        Towson CyberSecurity
        </Link>
        <ul>
          <CustomLink to="/Home">Home</CustomLink>
          <CustomLink to="/Signin">Sign-In</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          <CustomLink to="/News">News</CustomLink>
          <CustomLink to="/Resources">Resources</CustomLink>
          <CustomLink to="/Contact">Contact</CustomLink>
        </ul>
      </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
