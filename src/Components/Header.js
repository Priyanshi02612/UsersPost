import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <div className="container-fluid mt-2">
        <ul className="nav nav-pills position-sticky">
          <li className="nav-item">
            <Link className="nav-link me-3" to="/">Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
        </ul>
      </div>
  )
}

export default Header
