import React from 'react'
import { navigate, Link } from "@reach/router"
import { myFirebase as firebase } from 'utils/firebase'
import { getUser, logout } from "components/auth"
import { Typography, ClickAwayListener } from '@material-ui/core'

const adminMenu = [
  {
    name: "Home",
    slug: "/home"
  },
  {
    name: "Donate",
    slug: "/donate"
  },
  {
    name: "About Us",
    slug: "/about"
  },
  {
    name: "Buckets",
    slug: "/buckets",
    admin: true
  },
  {
    name: "Help",
    slug: "/help"
  },
]
const menu = [
  {
    name: "Home",
    slug: "/home"
  },
  {
    name: "Donate",
    slug: "/donate"
  },
  {
    name: "About Us",
    slug: "/about"
  },
  {
    name: "Help",
    slug: "/help"
  },
]

const Drawer = (props) => {
  const { email, displayName, photoURL } = getUser()
  console.log(photoURL)
  return (
    <ClickAwayListener onClickAway={props.handleClose}>
      <div className="drawer">
        <div className="profile">
          <div className="avatar-container">
            <img src={photoURL} alt={displayName} className="avatar" />
          </div>
          <Typography
            variant="body1"
            align="center"
            color="primary"
            className="w-5"
          >
            {displayName}
          </Typography>
          <Typography variant="body2" align="center" color="primary">
            {email}
          </Typography>
        </div>
        <div className="menu mt-3">
          {props.superUser && adminMenu.map(item => (
            <Link key={item.slug} to={item.slug}>
              <button className="bw-button menu-button">{item.name}</button>
            </Link>
          ))}
          {!props.superUser && menu.map(item => (
            <Link key={item.slug} to={item.slug}>
              <button className="bw-button menu-button">{item.name}</button>
            </Link>
          ))}
        </div>
        <div className="terms mt-3">
          <Typography variant="body2" align="center" color="secondary">
            Terms of use
          </Typography>
          <Typography variant="body2" align="center" color="secondary">
            Privacy Policy
          </Typography>
          <hr />
          <a
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(firebase).then(() => navigate(`/`))
            }}
          >
            <Typography variant="body2" align="center" color="secondary">
              Logout
            </Typography>
          </a>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default Drawer
