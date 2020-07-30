import React, { Component } from "react"
import "./App.scss"
import Nav from "./components/Nav/Nav"
import { Route, withRouter, Switch, Redirect } from "react-router-dom"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/Login"
import { connect } from "react-redux"
import { compose } from "redux"
import { initializeApp } from "./redux/appReducer"
import Preloader from "./components/common/preloader/Preloader"
import store from './redux/reduxStore'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { withSuspence } from "./hoc/withSuspence"
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

/* <Suspense fallback={<div><Preloader /></div>}>

     <Route path='/dialogs' render={() => <DialogsContainer />}/>

      <Route path='/profile/:userId?' render={() => <ProfileContainer />}/>

</Suspense>  */
class App extends Component {

  catchAllUnhandledError = (PromiseRejectionEvent) => {

  }
  componentDidMount() {

    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledError)
  
  }
  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledError)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <Switch>
          <div className="app-wrapper-content">
            <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
            <Route path="/dialogs" render={withSuspence(DialogsContainer)} />
            <Route path="/profile/:userID?" render={withSuspence(ProfileContainer)} />
            <Route path="/news" render={() => <News />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div>404</div>} />
          </div>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    initialized: state.app.initialized
  })

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)

const MainApp = (props) => {
  return <BrowserRouter >
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
}

export default MainApp