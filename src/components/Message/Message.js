import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
  render() {
    return (
      <div>
        <div className="message-metadata">
          {this.props.message.userName}
        </div>
        <div className="message tic1">
            {this.props.message.message}
        </div>
      </div>
    )
  }
}
