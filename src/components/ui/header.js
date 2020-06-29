import React from 'react'
import Topbar from 'components/ui/topbar'
import Drawer from 'components/ui/drawer'

const Header = (props) => {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <>
      <Topbar handleToggleDrawer={handleToggleDrawer} />
      {openDrawer && (
        <Drawer handleClose={handleCloseDrawer} superUser={props.superUser} />
      )}
    </>
  )
}

export default Header
