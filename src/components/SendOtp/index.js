import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class SendOtp extends Component {
  state = {
    email: '',
    msg: 'See you soon',
    redirect: 'Send',
    istrue: false,
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/verify')
  }

  onSubmitFailure = () => {
    this.setState({redirect: 'Send', istrue: true})
  }

  onEmailChange = e => {
    this.setState({email: e.target.value})
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const {email, msg} = this.state
    localStorage.setItem('email', email)
    const userDetails = {
      to: email,
      msg,
    }
    const url = 'https://email-otp-eight.vercel.app/send-otp'
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDetails),
    }
    if (!email) {
      console.error('Email field is empty!')
      this.onSubmitFailure()
      return
    }

    try {
      this.setState({redirect: 'wait 3 sec...'})
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.msg)
      } else {
        this.onSubmitFailure()
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_Token')
    if (jwtToken !== undefined) {
      return <Redirect to="/home" />
    }
    const {redirect, istrue} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onFormSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            onChange={this.onEmailChange}
          />
          <br />
          <button type="submit">{redirect}</button>
          {istrue && <p>Something went wrong try again</p>}
        </form>
      </div>
    )
  }
}

export default SendOtp
