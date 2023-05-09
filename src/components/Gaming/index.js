import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaHeartbeat} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const Gaming = props => {
  const {theme, changeTheme} = props
  const [gamingVideos, setGamingVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('inProgress')

  const getGamingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.videos.map(item => ({
        id: item.id,
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      setApiStatus('success')
      setGamingVideos(formattedData)
      console.log(formattedData, gamingVideos)
    } else {
      setApiStatus('failure')
    }
  }

  const renderGamingContentView = () => (
    <ul className="game-items-container">
      <h1 style={{width: '100vw'}}>
        <FaHeartbeat /> Gaming
      </h1>
      {gamingVideos.map(obj => (
        <Link
          to={`/videos/${obj.id}`}
          key={obj.id}
          className={`game-link ${theme ? 'bg-dark' : 'bg-light'}`}
        >
          <li className="game-item">
            <img
              src={obj.thumbnailUrl}
              alt={obj.id}
              className="game-img"
              style={{marginRight: '10px'}}
            />
            <h4 className="remove-margin">{obj.title}</h4>
            <p>{obj.viewCount} Watching Worldwide</p>
          </li>
        </Link>
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <div style={{textAlign: 'center'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h3>Oops! Something Went Wrong</h3>
        <p>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button" onClick={getGamingVideos}>
          Retry
        </button>
      </div>
    </div>
  )

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  const renderSwitch = () => {
    switch (apiStatus) {
      case 'inProgress':
        return renderLoader()
      case 'success':
        return renderGamingContentView()
      case 'failure':
        return renderFailureView()
      default:
        return null
    }
  }

  useEffect(() => {
    getGamingVideos()
  }, [])

  return (
    <div>
      <Header theme={theme} changeTheme={changeTheme} />
      <div className={`gaming-container ${theme ? 'bg-dark' : 'bg-light'}`}>
        <SideBar theme={theme} changeTheme={changeTheme} />
        {renderSwitch()}
      </div>
    </div>
  )
}
export default Gaming
