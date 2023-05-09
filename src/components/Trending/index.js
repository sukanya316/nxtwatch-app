import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

const Trending = props => {
  const {theme, changeTheme} = props
  const [trendVideos, setTrendVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('inProgress')

  const getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      const getYear = dat => {
        const d = Date.parse(dat)
        const date = new Date(d)
        const currDate = new Date()
        const year = currDate.getFullYear() - date.getFullYear()
        return year
      }
      const updatedData = data.videos.map(item => ({
        id: item.id,
        publishedAt: getYear(item.published_at),
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      setApiStatus('success')
      setTrendVideos(updatedData)
    } else {
      setApiStatus('failure')
    }
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
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
        <button type="button" onClick={getTrendingVideos}>
          Retry
        </button>
      </div>
    </div>
  )

  const renderTrendingContentView = () => (
    <ul className="ul-trending-container">
      <h1 style={{alignSelf: 'center'}}>
        <HiFire />
        Trending
      </h1>
      {trendVideos.map(obj => (
        <Link to={`/videos/${obj.id}`} key={obj.id} className="video-link">
          <li className="trend-item">
            <img
              src={obj.thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail"
              style={{marginRight: '10px'}}
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p>{obj.title}</p>
              <p>
                {obj.viewCount} {obj.publishedAt} years ago.
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )

  const renderSwitch = () => {
    switch (apiStatus) {
      case 'inProgress':
        return renderLoader()
      case 'success':
        return renderTrendingContentView()
      case 'failure':
        return renderFailureView()
      default:
        return null
    }
  }

  useEffect(() => {
    getTrendingVideos()
  }, [])

  return (
    <div
      className={`trending-main-container ${theme ? 'bg-dark' : 'bg-light'}`}
    >
      <Header theme={theme} changeTheme={changeTheme} />
      <div className="trending-items-container">
        <SideBar theme={theme} changeTheme={changeTheme} />
        {renderSwitch()}
      </div>
    </div>
  )
}
export default Trending
