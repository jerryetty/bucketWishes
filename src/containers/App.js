import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { myFirebase } from 'utils/firebase'
import { getUser, isLoggedIn } from 'components/auth'

import './App.css'
import 'normalize.css'
import Wrapper from 'containers/wrapper'
import Login from 'pages/login'
import { CircularProgress } from '@material-ui/core'
import SharedBucket from 'pages/sharedBucket'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F4203'
    },
    secondary: {
      main: '#645C00'
    }
  },
  typography: {
    fontFamily: ['Poppins'].join(',')
  }
})

const App = (props) => {
  const [superUser, setSuperUser] = React.useState(false)
  if (isLoggedIn()) {
    const { email } = getUser()

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

  return (
    <div>
      {!isLoggedIn() && (
        <div>
          <ThemeProvider theme={theme}>
            <Login />
           </ThemeProvider> 
        </div>
      )}
      {isLoggedIn() && (
        <div>
          <ThemeProvider theme={theme}>
            <Router {...props}>
              <Switch {...props}>
                <Route
                  path='/'
                  render={(props) => (
                    <Wrapper {...props} {...getUser()} superUser={superUser} />
                  )}
                />
                <Route
                  path='/bucket/:id'
                  render={(props) => <SharedBucket {...props} />}
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
