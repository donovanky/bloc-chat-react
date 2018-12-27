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
      this.setState({ activeRoom: selectedActiveRoom, activeRoomTitle: newActiveRoomTitle});
    }

    setUser(user) {
      console.log(`setUser() activated`);
        this.setState({user: user });
    }

    render() {
      return (
        <div className="App">
          <RoomList
            firebase={ firebase }
            activeRoom= { this.state.activeRoom }
            selectActiveRoom= { (key, title) => this.selectActiveRoom(key, title) }
            user= { this.state.user }
            setUser= { (user) => this.setUser(user) }
          />
          <MessageList
            firebase= { firebase }
            activeRoom= { this.state.activeRoom}
            selectedActiveRoom= { this.state.activeRoomTitle }
            user= { this.state.user }
          />
        </div>
      );
    }
  }
  export default App;
