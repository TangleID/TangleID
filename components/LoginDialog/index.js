import React from 'react'
import Button from 'material-ui/Button'
import SimpleForm from '../SimpleForm'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'

const styles = {
	button: {
		maxWidth: '35%',
	},
}

export default class LoginDialog extends React.Component {

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