import {Link} from 'react-router-dom'
import {BiHomeAlt} from 'react-icons/bi'
import {FaHeartbeat, FaFileExport} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import './index.css'

const SideBar = props => {
  const {theme} = props
  return (
    <div className="left-side-container">
      <ul style={{listStyleType: 'none', padding: '8px', margin: '0px'}}>
        <Link
          to="/"
          className={`highlight_link link ${theme ? 'bg-dark' : 'bg-light'}`}
        >
          <li>
            <BiHomeAlt className="nav-icon" /> Home
          </li>
        </Link>
        <Link
          to="/trending"
          className={`highlight_link link ${theme ? 'bg-dark' : 'bg-light'}`}
        >
          <li className="link">
            <HiFire className="nav-icon" />
            Trending
          </li>
        </Link>
        <Link
          to="/gaming"
          className={`highlight_link link ${theme ? 'bg-dark' : 'bg-light'}`}
        >
          <li className="link">
            <FaHeartbeat className="nav-icon" />
            Gaming
          </li>
        </Link>
        <Link
          to="/saved-videos"
          className={`highlight_link link ${theme ? 'bg-dark' : 'bg-light'}`}
        >
          <li>
            <FaFileExport className="nav-icon" />
            Saved videos
          </li>
        </Link>
      </ul>
      <div className="contact-us-container">
        <p>CONTACT US</p>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-icon"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </div>
  )
}
export default SideBar
