import React from 'react'
import { Link, Redirect, BrowserRouter } from 'react-router-dom'
import { myFirebase as firebase } from 'utils/firebase'
import { getUser, logout } from 'components/auth'
import { Typography, ClickAwayListener, Button } from '@material-ui/core'

const adminMenu = [
  {
    name: 'Home',
    slug: '/home'
  },
  {
    name: 'Donate',
    slug: '/donate'
  },
  {
    name: 'About Us',
    slug: '/about'
  },
  {
    name: 'Buckets',
    slug: '/buckets'
  },
  {
    name: 'Help',
    slug: '/help'
  }
]
const menu = [
  {
    name: 'Home',
    slug: '/home'
  },
  {
    name: 'Donate',
    slug: '/donate'
  },
  {
    name: 'About Us',
    slug: '/about'
  },
  {
    name: 'Help',
    slug: '/help'
  }
]

const Drawer = (props) => {
  const { email, displayName, photoURL } = getUser()
  console.log(photoURL)
  return (
    <div className='overlay'>
      <ClickAwayListener onClickAway={props.handleClose}>
        <div className='drawer'>
          <div className='drawer-content'>
            <div className='profile'>
              <div className='avatar-container'>
                <img src={photoURL} alt={displayName} className='avatar' />
              </div>
              <Typography
                variant='body1'
                align='center'
                color='primary'
                className='w-5'
              >
                {displayName}
              </Typography>
              <Typography variant='body2' align='center' color='primary'>
                {email}
              </Typography>
            </div>
            <div className='menu mt-3'>
              {props.superUser &&
                adminMenu.map((item) => (
                  <Link key={item.slug} to={item.slug}>
                    <button className='bw-button menu-button' onClick={props.handleClose}>
                      {item.name}
                    </button>
                  </Link>
                ))}
              {!props.superUser &&
                menu.map((item) => (
                  <Link key={item.slug} to={item.slug}>
                    <button className='bw-button menu-button' onClick={props.handleClose}>
                      {item.name}
                    </button>
                  </Link>
                ))}
            </div>
            <div className='terms mt-3 text-center'>
              <a href="https://www.enwranch.org/uploads/4/5/1/2/45122889/enwrprivacypolicy2019.pdf">
                <button className='btn btn-link'>
                  <Typography variant='caption'>
                    Privacy Policy
                  </Typography>
                </button>
              </a>
              <br/>
              <a href="https://www.enwranch.org/uploads/4/5/1/2/45122889/enwrdonationdisclaimer2019.pdf">
                <button className='btn btn-link'>
                  <Typography variant='caption'>
                    Donations Disclaimer
                  </Typography>
                </button>
              </a>              
              <br />
              <Link
                to='/login'
                onClick={(event) => {
                  event.preventDefault()
                  logout(firebase)
                }}
              >
                <button className='btn btn-warning menu-button mb-3'>
                  <Typography variant='caption'>
                    Logout
                  </Typography>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default Drawer
