import React, { Component } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow/ChatWindow.js';
import firebase from 'firebase';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }
  }

  get uid() {
      return (firebase.auth().currentUser || {}).uid;
  }

  // get user() {
  //   return {
  //     name: ...,
  //     id: ...,
  //   }
  // }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 'user': user });
    });
  }

  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <h2>
            Brevity
          </h2>          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <ChatWindow user={this.state.user} />
        </div>
      </div>
    );
  }

}

export default App;
