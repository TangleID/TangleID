import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const style = {
  text: {
    width: '90%',
    paddingTop: '3vh',
  },
};

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleMessages() {
    const message = this.refs.msgField.input.value;

    if (message) {
      const messageObj = {
        uid: this.props.uid,
        username: this.props.username,
        content: message,
        time: this.getTime(),
      };

      this.props.socket.emit('updateMessages', messageObj);
      this.refs.msgField.input.value = '';
      this.props.actions.setErrorInfo('');
    } else {
      this.props.actions.setErrorInfo('You don\'t input any messages.');
    }
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleMessages();
    }
  }
  getTime() {
    const date = new Date();
    let [hour, minute] = [date.getHours(), date.getMinutes()];
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;

    return `${hour}:${minute}`;
  }
  render() {
    const styles = Object.assign({}, style.text);

    for (const key in this.props.style) {
      (key === 'display') ?
        styles.display = this.props.style[key] :
        styles[key] = this.props.style[key];
    }

    return (
      <TextField
        ref="msgField"
        style={styles}
        placeholder={this.props.placeholder || 'Input messsages'}
        errorText={this.props.errorinfo}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }
}

export default ChatInput;
