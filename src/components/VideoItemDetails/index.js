import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {FaFileExport} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const VideoItemDetails = props => {
  const {theme, changeTheme} = props
  const [videoDetails, setVideoDetails] = useState({})
  const [apiStatus, setApiStatus] = useState('inProgress')
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const getVideoDetails = async () => {
    // const {match} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: getYear(data.video_details.published_at),
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      setApiStatus('success')
      setVideoDetails(updatedData)
    } else {
      setApiStatus('failure')
    }
  }

  const onSave = () => {
    const {saveVideo} = props
    const videoObj = {...videoDetails}
    console.log(videoObj)
    saveVideo(videoObj)
  }

  const renderVideoDetailsContent = () => (
    <div className="video-container">
      <ReactPlayer
        url={videoDetails.videoUrl}
        className="responsive-container"
      />

      <h4>{videoDetails.title}</h4>
      <div className="views-count-container">
        <p>{videoDetails.viewCount}</p>
        <div className="like-dislike-container">
          <p>
            <BiLike />
            Like
          </p>
          <p>
            <BiDislike />
            Dislike
          </p>
          <button type="button" onClick={onSave} className="save-btn">
            <FaFileExport className="nav-icon" />
            Save
          </button>
        </div>
      </div>
      <hr />
      <div className="profile-container">
        <img
          src={videoDetails?.channel?.profileImageUrl}
          alt={videoDetails?.name}
          className="profile-img"
        />
        <div className="channel-details">
          <p className="remove-margin">{videoDetails?.channel?.name}</p>
          <p className="remove-margin">
            {videoDetails?.channel?.subscriberCount} subscribers
          </p>
          <p>{videoDetails?.description}</p>
        </div>
      </div>
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
        <button type="button" onClick={getVideoDetails}>
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
    console.log(videoDetails)
    switch (apiStatus) {
      case 'inProgress':
        return renderLoader()
      case 'success':
        return renderVideoDetailsContent()
      case 'failure':
        return renderFailureView()
      default:
        return null
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [])

  return (
    <div
      className={`video-item-main-container ${theme ? 'bg-dark' : 'bg-light'}`}
    >
      <Header theme={theme} changeTheme={changeTheme} />
      <div className="video-content-container">
        <SideBar theme={theme} changeTheme={changeTheme} />
        {renderSwitch()}
      </div>
    </div>
  )
}
export default VideoItemDetails
