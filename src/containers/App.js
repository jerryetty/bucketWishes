import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { Router } from '@reach/router'
import PrivateRoute from 'components/auth/privateRoute'
import { myFirebase } from 'utils/firebase'
import { getUser, isLoggedIn } from 'components/auth'

import './App.css'
import 'normalize.css'
import Login from 'pages/login'
import About from 'pages/about'
import Home from 'pages/home'
import Donate from 'pages/donate'
import Help from 'pages/help'
import Buckets from 'pages/buckets'
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

const App = () => {
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
    <ThemeProvider theme={theme}>
      <div className='container main'>
        <Router>
          <SharedBucket path='/bucket/:id' />
          <PrivateRoute
            component={() => <Home {...getUser()} superUser={superUser} />}
            path='/'
          />
          <PrivateRoute
            component={() => <Home {...getUser()} superUser={superUser} />}
            path='/home'
          />
          <PrivateRoute
            component={() => <About {...getUser()} superUser={superUser} />}
            path='/about'
          />
          <PrivateRoute
            component={() => <Donate {...getUser()} superUser={superUser} />}
            path='/donate'
          />
          <PrivateRoute
            component={() => <Help {...getUser()} superUser={superUser} />}
            path='/help'
          />
          <PrivateRoute
            component={() => <Buckets {...getUser()} superUser={superUser} />}
            path='/buckets'
          />
          <Login path='/' />
          <Login path='/login' />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
