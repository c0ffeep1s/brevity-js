import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
  render() {
    const fromMe = this.props.me == this.props.message.userName ? "message": "banana";
    console.log(this.props.me, this.props.message.userName);
      return (
        <div>
          <div className="message-metadata">
            {this.props.message.userName}
          </div>
          <div className={fromMe}>
              {this.props.message.message}
          </div>
        </div>
      )
  }
}
