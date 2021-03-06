import React from "react"
import { setUser } from "components/auth"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Typography } from "@material-ui/core"
import Logo from 'components/images/logo.png'

const Login = () => {
  const getUiConfig = auth => {
    return {
      signInFlow: "popup",
      signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID,
        auth.EmailAuthProvider.PROVIDER_ID,
      ],
      
      callbacks: {
        signInSuccessWithAuthResult: result => {
          setUser(result.user)
        },
      },
    }
  }

  return (
    <>
      <div className='main container'>
        <div className='row login-container'>
          <div className='col-md-6'>
            <div className='text-center text-md-left'>
              <Typography variant='h3' color='primary' className='w-7 login-heading'>
                Welcome to BucketWishes!
              </Typography>
              <Typography variant='body1' color='text-primary' className='mt-4 w-5 login-desc'>
                Share words of encouragement with those who need to know they
                are being thought of, loved and appreciated. Create a bucket for
                special holidays or events and invite others to join you in
                filling it with warm wishes of thanks, encouragement,
                appreciation and love. So get ready…think outside of the
                Bucket…and make someone’s day! Choose one of the providers to
                sign in and get started.
              </Typography>
            </div>
          </div>
          <div className='col-md-6 '>
            <div className='mt-4 mb-4'>
              <div className='login-card'>
                <img src={Logo} alt='logo' id='login-logo' />
                <div>
                  {firebase && (
                    <StyledFirebaseAuth
                      uiConfig={getUiConfig(firebase.auth)}
                      firebaseAuth={firebase.auth()}
                    />
                  )}
                </div>
                <Typography variant='body2' color='text-primary' align='center'>
                  By signing in you agree to our <br/> Terms of use and privacy policy
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
