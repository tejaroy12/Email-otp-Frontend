import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Verify extends Component {
  state = {
    otp: '',
    email: '',
    istrue: false,
    msg: '',
  }

  componentDidMount() {
    const storedEmail = localStorage.getItem('email')
    this.setState({email: storedEmail})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_Token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/home')
  }

  onSubmitFailure = msg => {
    this.setState({
      istrue: true,
      msg,
    })
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const {otp, email} = this.state
    const details = {to: email, otpV: otp}
    const url = 'https://email-otp-eight.vercel.app/verify'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure(data.msg)
    }
  }

  onOtpChange = e => {
    this.setState({otp: e.target.value})
  }

  onReenter = () => {
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_Token')
    if (jwtToken !== undefined) {
      return <Redirect to="/home" />
    }
    const {istrue, msg} = this.state
    return (
      <div className="verify-container">
        <form className="form-container" onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="Enter Otp"
            onChange={this.onOtpChange}
          />
          <br />
          <div>
            <button type="submit">Verify</button>
            <button type="button" onClick={this.onReenter}>
              Re Enter Email
            </button>
            {istrue && <p>{msg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default Verify
