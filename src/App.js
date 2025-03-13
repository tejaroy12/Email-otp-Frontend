import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SendOtp from './components/SendOtp'
import Verify from './components/Verify'
import Home from './components/Home'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={SendOtp} />
      <Route path="/verify" component={Verify} />
      <Route path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
