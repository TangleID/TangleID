import Router from 'next/router'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import SimpleForm from '../SimpleForm'
import {Component} from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog'

const styles = theme => ({
	cancel: {
		maxWidth: '35%',
	},
})

class FormDialog extends Component {
	state = {
		open: false,
		init_open: false
	}

	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false})
	}

	changeInit = (open) => {
		if (open && this.state.init_open == false) {
			this.setState({init_open: true, open: true})
		}
	}

	render() {
		const {classes, open} = this.props
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
						<Button onClick={this.handleClose} className={classes.cancel} color="secondary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

FormDialog.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormDialog)
