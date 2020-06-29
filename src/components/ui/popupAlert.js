import React from "react"
import { Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const PopupAlert = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.handleHideAlert}
    >
      <Alert onClose={props.handleHideAlert} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export default PopupAlert
