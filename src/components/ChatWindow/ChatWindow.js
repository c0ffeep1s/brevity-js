import React, { Component } from 'react';
import './ChatWindow.css';
import Message from '../Message/Message.js';

import firebase from 'firebase';

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      message: '',
      data: []
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.messageRef = firebase.database().ref().child('messages');
  }

  // listen messages
  componentDidMount() {
    this.messageRef.limitToLast(10).on('value', message => {
      this.setState({
        // this is returning null because data is empty
        data: Object.values(message.val() || {})
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // why is this always undefined
    if(nextProps.user) {
      // this is the client's user name
      this.setState({'userName': nextProps.user.displayName});
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend(event) {
    if (this.state.message) {
      var newData = {
        userName: this.state.userName,
        message: this.state.message,
      }

      this.messageRef.push(newData);
      // clear input field
      this.setState({message: ''});

      // stop page from refreshing?
      event.preventDefault();
    }
  }

  render() {
    return (
      <div >
        <div className="message-list">
          { this.state.data.map( (item, index) =>
          <Message key={index} message={item} me={this.state.userName}/> ) }
        </div>
        <div className="chat-window">
          <form onSubmit={this.handleSend}>
            <input className="message-box" type="text" value={this.state.message} onChange={this.handleChange}/>
          </form>
        </div>
      </div>
    );
  }
}
