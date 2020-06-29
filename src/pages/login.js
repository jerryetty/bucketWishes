import React from "react"
import { navigate } from "@reach/router"
import { setUser, isLoggedIn } from "components/auth"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Typography } from "@material-ui/core"

const Login = () => {
  if (isLoggedIn()) {
    navigate(`/`)
  }

  const getUiConfig = auth => {
    return {
      signInFlow: "popup",
      signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      
      callbacks: {
        signInSuccessWithAuthResult: result => {
          setUser(result.user)
          navigate(`/`)
        },
      },
    }
  }

  return (
    <>
      <div className="main container">
        <div className="row">
          <div className="col-md-6">
            <div className="login-container">
              <Typography variant="h3" color="primary" className="w-5">
                Welcome to Bucket Wishes
              </Typography>
              <Typography variant="body1" color="primary" className="mt-4">
                Share well wishes with loved ones by creating buckets and
                filling them with beautiful thoughts (wishes). Choose one of the
                providers to signin and get started
              </Typography>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-container">
              <div className="login-card">
                <Typography variant="h4" color="primary" className="w-7">
                  Sign in
                </Typography>
                <div>
                  {firebase && (
                    <StyledFirebaseAuth
                      uiConfig={getUiConfig(firebase.auth)}
                      firebaseAuth={firebase.auth()}
                    />
                  )}
                </div>
                <Typography variant="body2" color="primary" align="center">
                  By signing in you agree to our Terms of use and privacy policy
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
