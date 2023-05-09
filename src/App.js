import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const savedVideos = []

// Replace your code here
const App = () => {
  const [isDark, setIsDark] = useState(false)
  const saveVideo = item => {
    savedVideos.push(item)
  }

  const changeTheme = themeStatus => {
    console.log('App', !themeStatus)
    setIsDark(!themeStatus)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/">
          <Home theme={isDark} changeTheme={changeTheme} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/videos/:id">
          <VideoItemDetails
            savedVideos={savedVideos}
            saveVideo={saveVideo}
            theme={isDark}
            changeTheme={changeTheme}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/trending">
          <Trending theme={isDark} changeTheme={changeTheme} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/gaming">
          <Gaming theme={isDark} changeTheme={changeTheme} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-videos">
          <SavedVideos
            savedVideos={savedVideos}
            theme={isDark}
            changeTheme={changeTheme}
          />
        </ProtectedRoute>
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
