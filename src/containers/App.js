import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { myFirebase } from 'utils/firebase'

import './App.css'
import 'normalize.css'
import Wrapper from 'containers/wrapper'
import Login from 'pages/login'
import { CircularProgress } from '@material-ui/core'
import SharedBucket from 'pages/sharedBucket'
import PreviewBucket from 'pages/previewBucket'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c36a2d'
    },
    secondary: {
      main: '#ffc400'
    },
    accent: {
      main: '#a6bf01'
    }
  },
  typography: {
    fontFamily: ['Poppins'].join(',')
  }
})

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh'
  }
}))

const App = (props) => {
  const useUser = () => {
    const [currentUser, setCurrentUser] = React.useState([])
    React.useEffect(() => {
      myFirebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setCurrentUser(user)
        } else {
          // User is signed out.
          setCurrentUser(null)
        }
      })
    }, [])
    return currentUser
  }

  var user = useUser()

  const [superUser, setSuperUser] = React.useState(false)
  if (user && user.email) {
    const email = user.email

    const superUserRef = myFirebase.firestore().collection('super-users')

    superUserRef
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          setSuperUser(false)
          return
        }

        snapshot.forEach((doc) => {
          setSuperUser(true)
        })
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
  }

  const classes = useStyles()

  return (
    <div>
      {!user && (
        <div>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route
                  exact
                  path='/bucket/:id'
                  render={(props) => <SharedBucket {...props} />}
                />
                <Route
                  exact
                  path='/preview/:id'
                  render={(props) => <PreviewBucket {...props} />}
                />
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Login} />
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      )}
      {user && !user.uid && (
        <div className={classes.loader}>
          <ThemeProvider theme={theme}>
            <CircularProgress />
          </ThemeProvider>
        </div>
      )}
      {user && user.uid && (
        <div>
          <ThemeProvider theme={theme}>
            <Router {...props}>
              <Switch {...props}>
                <Route
                  path='/bucket/:id'
                  render={(props) => <SharedBucket {...props} />}
                />
                <Route
                  path='/preview/:id'
                  render={(props) => <PreviewBucket {...props} />}
                />
                <Route
                  path='/'
                  render={(props) => (
                    <Wrapper {...props} {...user} superUser={superUser} />
                  )}
                />
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      )}
    </div>
  )
}

export default App
