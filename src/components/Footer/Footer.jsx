import { Link } from 'react-router-dom'

import { Logo } from '../index'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__content">
        <div className="site-footer__brand">
          <Logo width="150px" />
          <p>Share your thoughts and stories with the world.</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/all-posts">Posts</Link>
          <Link to="/add-post">Write</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <p>&copy; 2026 MyBlog. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer