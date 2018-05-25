import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import SimpleForm from '../SimpleForm'


const styles = {
	button: {
		maxWidth: '35%',
	},
}

class LoginDialog extends Component {

	state = {
		open: false,
		init_open: false,
	}

	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false})
	}

	changeInit = (open) => {
		if (open && false === this.state.init_open) {
			this.setState({init_open: true, open: true})
		}
	}

	render() {
		const {open} = this.props
		this.changeInit(open)

		return (
			<div>
				{!open &&
				<Button onClick={this.handleClickOpen} color="inherit">Login</Button>
				}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Login</DialogTitle>
					<DialogContent>
						<SimpleForm
							name="newIdentityForm"
							meta={{
								inputs: [{
									name: 'UUID',
									label: 'UUID',
								}, {
									name: 'Secret Key',
									label: 'Secret Key',
								}],
								submit: {
									text: 'send'
								}
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} style={styles.button} color="secondary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default withStyles(styles)(LoginDialog)