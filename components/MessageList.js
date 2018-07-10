import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageList extends Component {
  render() {
    return (
      <div>
        {
          Object.keys(this.props.messages).map(key => (
            <div key={`div-test-${key}`}>
              <ul>
                <li> {key} </li>
                <ul>
                  {this.props.messages[key].map(data => (
                    <li key={`li3-${key}${data.msg}`}>{data.msg} {data.fromSelf ? '- You' : ''}</li>
                  ))}
                </ul>
              </ul>
            </div>
        ))}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.object,
};


export default MessageList;
