import React from "react"
import { Link } from "@reach/router"
import { Typography } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

const Topbar = props => {
  return (
    <div className="row">
      <div className="col-10 mt-4">
        <Link to="/">
          <Typography variant="h5" color="primary" className="w-7">
            Bucket Wishes
          </Typography>
        </Link>
      </div>
      <div className="col-2 mt-4 text-right">
        <Typography variant="h5" color="primary" className="w-7">
          <MenuIcon className="c-pointer" onClick={props.handleToggleDrawer} />
        </Typography>
      </div>
    </div>
  )
}

export default Topbar
