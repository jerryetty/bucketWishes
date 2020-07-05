import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"
import Logo from 'components/images/logo.png'

const Topbar = props => {
  return (
    <div className="row top-bar">
      <div className="col-10 mt-4">
        <Link to="/">
          {/* <Typography variant="h5" color="primary" className="w-7" id="brand">
            Bucket Wishes
          </Typography> */}
          <img src={Logo} alt="logo" id="brand"/>
        </Link>
      </div>
      <div className="col-2 mt-4 text-right">
        <Typography variant="h5" color="primary" className="w-7">
          <MenuIcon className="c-pointer" onClick={props.handleToggleDrawer} id="appbar-menu" />
        </Typography>
      </div>
    </div>
  )
}

export default Topbar
