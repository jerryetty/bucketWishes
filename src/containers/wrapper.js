import React, { useState } from 'react'
import Topbar from 'components/ui/topbar'
import Drawer from 'components/ui/drawer'

const Wrapper = (children) => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <>
      <Topbar handleToggleDrawer={handleToggleDrawer} />
      {openDrawer && <Drawer handleClose={handleCloseDrawer} />}
      {children}
    </>
  )
}

export default Wrapper
