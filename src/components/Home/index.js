import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_Token')
  if (jwtToken === undefined) {
    history.replace('/login')
  }

  const onLogout = () => {
    Cookies.remove('jwt_Token')
    history.replace('/login')
  }
  return (
    <div className="home-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/home-blog-img.png"
        alt="home"
        className="home-img"
      />
      <h1 className="home-heading">Home</h1>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home
