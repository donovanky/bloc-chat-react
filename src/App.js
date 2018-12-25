import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
        activeRoom: '',
        activeRoomTitle: '',
        user: ''
      };
    }

    selectActiveRoom(key, title){
      const selectedActiveRoom = key;
      const newActiveRoomTitle= title;
      this.setState({ activeRoom: selectedActiveRoom});
    }

    setUser(user) {
      console.log(`setUser() activated`);
        this.setState({user: user });
    }

    render() {
      return (
        <div className="App">
          <User
            firebase={ firebase }
            user={ this.state.user }
            setUser={ (user) => this.setUser(user) }
            />
          <RoomList
            firebase={ firebase }
            activeRoom= { (key) => this.activeRoom(key) }
            selectActiveRoom={ (key) => this.selectActiveRoom(key) }
          />
          <MessageList
            firebase={ firebase }
            activeRoom= { this.state.activeRoom }
          />
        </div>
      );
    }
  }
  export default App;
