import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = event => {
    const pwdEl = document.getElementById('password')
    if (event.target.checked) {
      pwdEl.type = 'text'
    } else {
      pwdEl.type = 'password'
    }
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
      })
      this.setState({username: '', password: ''})
    } else {
      this.setState({isError: "*Username and password didn't match"})
    }
  }

  render() {
    const {username, password, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <form className="login-container" onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={this.changeUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={this.changePassword}
          />
          <div>
            <input
              type="checkbox"
              id="show-password"
              onChange={this.showPassword}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {isError === '' ? '' : <p style={{color: 'red'}}>{isError}</p>}
        </form>
      </div>
    )
  }
}
export default Login
