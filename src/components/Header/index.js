import {withRouter} from 'react-router-dom'
import {useState} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history, theme} = props
  const [modalOpen, setModalOpen] = useState(false)
  const [isDark, setIsDark] = useState(theme)

  const onConfirm = () => {
    setModalOpen(false)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const onLogout = () => {
    setModalOpen(true)
  }

  const themeChange = () => {
    const {changeTheme} = props
    setIsDark(!isDark)
    changeTheme(isDark)
  }

  return (
    <div className={`header-container ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <img
        src={`${
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        }`}
        alt="website logo"
        className="login-logo"
      />
      <div className="header-items">
        <button
          type="button"
          onClick={themeChange}
          className="theme-btn"
          id="theme"
        >
          {isDark ? (
            <FiSun className="sun-icon" />
          ) : (
            <FaMoon className="moon-icon" />
          )}
        </button>
        <img
          className="profile-icon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
        <Popup open={modalOpen} closeOnDocumentClick onClose={closeModal}>
          <div className="popup-container">
            <p>Are you sure, you want to logout?</p>
            <div className="modal-btns">
              <button type="button" className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="confirm-btn" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}
export default withRouter(Header)
