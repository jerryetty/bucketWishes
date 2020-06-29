import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

const ConfirmDialog = props => {
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>
				<small>{props.message}</small>
			</DialogTitle>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					No
				</Button>
				<Button onClick={props.action} color='primary'>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog
