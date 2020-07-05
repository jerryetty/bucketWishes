import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Topbar from 'components/ui/topbar'
import Drawer from 'components/ui/drawer'

import About from 'pages/about'
import Home from 'pages/home'
import Donate from 'pages/donate'
import Help from 'pages/help'
import Buckets from 'pages/buckets'
import SharedBucket from 'pages/sharedBucket'

const Wrapper = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <div className='container main'>
      <Topbar handleToggleDrawer={handleToggleDrawer} />
      {openDrawer && <Drawer handleClose={handleCloseDrawer} {...props} />}
      <Switch>
        <Route path='/home' render={(props) => <Home {...props} />} />
        <Route path='/about' render={(props) => <About {...props} />} />
        <Route path='/donate' render={(props) => <Donate {...props} />} />
        <Route path='/help' render={(props) => <Help {...props} />} />
        <Route path='/buckets' render={(props) => <Buckets {...props} />} />
        <Route
          path='/bucket/:id'
          render={(props) => <SharedBucket {...props} />}
        />
        <Route exact path='/' render={(props) => <Home {...props} />} />
      </Switch>
    </div>
  )
}

export default Wrapper
