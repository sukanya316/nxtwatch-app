import {Link} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const SavedVideos = props => {
  const {savedVideos, theme, changeTheme} = props

  const noSavedVideosView = () => (
    <div className="no-saved-videos-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          className="failure-img"
        />
        <h4>No saved videos found</h4>
        <p>You can save your videos while watching them.</p>
      </div>
    </div>
  )

  return (
    <div
      className={`trending-main-container ${theme ? 'bg-dark' : 'bg-light'}`}
    >
      <Header theme={theme} changeTheme={changeTheme} />
      <div className="trending-items-container">
        <SideBar theme={theme} changeTheme={changeTheme} />
        {savedVideos.length === 0 ? (
          noSavedVideosView()
        ) : (
          <ul>
            <h1 style={{alignSelf: 'center'}}>
              <HiFire />
              Saved Videos
            </h1>
            {savedVideos.map(obj => (
              <Link
                to={`/videos/${obj.id}`}
                key={obj.id}
                className={`video-link ${theme ? 'bg-dark' : 'bg-light'}`}
              >
                <li className="trend-item">
                  <img
                    src={obj.thumbnailUrl}
                    alt={obj.id}
                    className="thumbnail"
                    style={{marginRight: '10px'}}
                  />
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h4>{obj.title}</h4>
                    <p>
                      {obj.viewCount}, {obj.publishedAt} years ago
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default SavedVideos
