import Link from 'next/link'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import MessageInput from '../MessageInput';

const style = {
     container: {
        ["text-align"]: "center",
	    height: "82vh",
	    width: "100%",
	    display: "-webkit-flex",
	    display: "flex",
	    ["-webkit-flex-flow"]: "row",
	    ["flex-flow"]: "row"
     },
     top: {
        height: "10vh",
     },
     message: {
        height: "75vh",
        "padding": "0 5px",
        "overflow-y": "auto",
     },
     footer: {
        height: "15vh",
        width: "100%",
        display: "-webkit-flex",
        display: "flex",
        ["-webkit-flex-flow"]: "row",
        ["flex-flow"]: "row"
     },
     ["message-input"]: {
        height: "15vh"
     }
}

class ChatRoomLayout extends Component {
    constructor(props) {
		super(props)
		this.state = {}
    }

    render() {
        return(
            <div>
                <div style={style.container}>
                    <div style={style.top}>
                    <Link href={`/users`}>
                        <Button
                            variant="raised"
                            color="secondary"
                        >
                            Leave
                        </Button>
                    </Link>
                    </div>
                    <div style={style.message}>Add chat</div>
                </div>
                <div style={style.footer}>
                    <div style={style["message-input"]}>
                        <MessageInput { ...this.props } />
                        <Button>Submint</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoomLayout
