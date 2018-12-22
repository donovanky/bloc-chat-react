
import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/RoomList';
import './App.css';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgmsoP8iMmnIaDX3vZxgvn5DMVR0J5Hqg",
    authDomain: "bloc-chat-react-205a4.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-205a4.firebaseio.com",
    projectId: "bloc-chat-react-205a4",
    storageBucket: "bloc-chat-react-205a4.appspot.com",
    messagingSenderId: "612577108674"
  };
  firebase.initializeApp(config);

  class App extends Component {
    constructor(){
      super();

      this.state = {
        activeRoom: ''
      };
    }

    selectActiveRoom(key){
      const selectedActiveRoom = key;
      this.setState({ activeRoom: selectedActiveRoom});
    }

    render() {
      return (
        <div className="App">
          <RoomList
          firebase={ firebase }
          activeRoom= { this.state.activeRoom }
          selectActiveRoom={ (key) => this.selectActiveRoom(key) }
          />
          <MessageList
          firebase={firebase}
          activeRoom= {this.state.activeRoom}
          />
        </div>
      );
    }
  }
  export default App;
