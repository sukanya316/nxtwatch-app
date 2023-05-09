import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    searchedVal: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchedVal} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchedVal}`
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

      const updatedList = data.videos.map(item => ({
        id: item.id,
        publishedAt: getYear(item.published_at),
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      this.setState({
        videosList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchNotFound = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search Results Found.</h1>
      <p>Try different key words or remove search filter.</p>
      <button type="button" onClick={this.getHomeVideos}>
        Retry
      </button>
    </div>
  )

  onSearch = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const searchVal = document.getElementById('searchButton').value
    const url = `https://apis.ccbp.in/videos/all?search=${searchVal}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    const data = await response.json()
    const getYear = dat => {
      const d = Date.parse(dat)
      const date = new Date(d)
      const currDate = new Date()
      const year = currDate.getFullYear() - date.getFullYear()
      return year
    }
    const updatedList = data.videos.map(item => ({
      id: item.id,
      publishedAt: getYear(item.published_at),
      thumbnailUrl: item.thumbnail_url,
      title: item.title,
      viewCount: item.view_count,
    }))
    this.setState({videosList: updatedList})
  }

  renderHomeContent = () => {
    const {videosList} = this.state
    const {theme} = this.props
    return videosList.length === 0 ? (
      <div className={`failure-container ${theme ? 'bg-dark' : 'bg-light'}`}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failure-img"
        />
        <h3>No search results Found</h3>
        <p>Try different key words or remove search filter.</p>
        <p>Please try again!</p>
        <button type="button" onClick={this.getHomeVideos}>
          Retry
        </button>
      </div>
    ) : (
      <ul className={`video-items-container ${theme ? 'bg-dark' : 'bg-light'}`}>
        {videosList.map(obj => (
          <Link to={`/videos/${obj.id}`} key={obj.id} className="video-link">
            <li className="video-item">
              <img
                src={obj.thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail"
              />
              <p>{obj.title}</p>
              <p>
                {obj.viewCount}, {obj.publishedAt} years ago.
              </p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderFailureView = () => {
    const {theme} = this.props
    return (
      <div className={`failure-container ${theme ? 'bg-dark' : 'bg-light'}`}>
        <div style={{textAlign: 'center'}}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h3>Oops! Something Went Wrong</h3>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" onClick={this.getHomeVideos}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderSwitch = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderHomeContent()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus, videosList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const {theme, changeTheme} = this.props
    console.log('home', jwtToken, videosList, theme)
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header theme={theme} changeTheme={changeTheme} />
        <div className={`home-container ${theme ? 'bg-dark' : 'bg-light'}`}>
          <SideBar theme={theme} changeTheme={changeTheme} />
          <div style={{width: '80vw'}}>
            <div id="banner">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
                className="login-logo"
              />
              <p>Buy Nxt Watch Premium prepaid plans with Upi.</p>
              <button type="button">GET IT NOW</button>
            </div>
            <div style={{margin: '0px'}}>
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  id="searchButton"
                />
                <button
                  type="button"
                  onClick={this.onSearch}
                  className="search-btn"
                >
                  <BiSearch className="search-icon" />
                </button>
              </div>
              {this.renderSwitch(apiStatus)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
