import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"
import Logo from 'components/images/logo.png'

const Topbar = props => {
  return (
    <div className='top-bar'>
        <Link to='/'>
          {/* <Typography variant="h5" color="primary" className="w-7" id="brand">
            Bucket Wishes
          </Typography> */}
          <img src={Logo} alt='logo' id='brand' />
        </Link>
        {!props.hideHumberger && (
            <MenuIcon
              className='c-pointer'
              onClick={props.handleToggleDrawer}
              id='appbar-menu'
            />
        )}
    </div>
  )
}

export default Topbar
