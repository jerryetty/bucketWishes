import React from "react"
import PropTypes from "prop-types"
import { navigate } from "@reach/router"
import { isLoggedIn } from "./index.js"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/login`, { replace: true })
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute