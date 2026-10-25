import { Link } from 'react-router-dom'
import '../../App.css'

import {Logo} from '../index'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div className="site-footer__brand">
          <Logo />
          <p>Share your thoughts and stories with the world.</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          <a to="#">Home</a>
          <a to="#">About</a>
          <a to="#">Contact</a>
          <a to="#">Privacy Policy</a>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; 2026 MyBlog. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer