import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Login from '../../actions/Login'

let createHandlers = function(dispatch) {
    let onClick = function(data) {
        dispatch(Login(data))
    }

    return {
        onClick,
    }
}

class LoginDialog extends Component {

    constructor(props) {
        super(props)
        this.handlers = createHandlers(props.dispatch)

        this.state = {
            open: false,
            init_open: false,
            uuid: "",
            sk: "",
        }

    }


	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false})
	}

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit() {
        console.log(this.state.uuid)
        return this.state.uuid 
    }

	changeInit = (open) => {
		if (open && false === this.state.init_open) {
			this.setState({init_open: true, open: true})
		}
	}

	render() {
		const { open, isLogin } = this.props
		this.changeInit(open)

		return (
			<div>
                { !isLogin ?
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

                            <form onSubmit={(e) => {
                                e.preventDefault()
                                this.handlers.onClick(this.handleSubmit())
                                this.handleClose()
                            }}>
                                <div key="login-uuid">
                                    <TextField
                                        id="uuid"
                                        placeholder="UUID"
                                        value={this.state.uuid}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <div key="login-sk">
                                    <TextField
                                        id="sk"
                                        placeholder="Secret Key"
                                        value={this.state.sk}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </div>
                                <Button type="submit" size="medium" color="primary" variant="raised">
                                    Send 
                                </Button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} size="medium" color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                   </div>
                : <div>
                    <Button onClick={this.handleClose} color="inherit">
                       Logout 
                    </Button>
                  </div>
                }
			</div>
		)
	}
}

const mapStateToProps = store => {
    return {
        isLogin: store.users.isLogin
    }
}

export default connect(mapStateToProps)(LoginDialog)
