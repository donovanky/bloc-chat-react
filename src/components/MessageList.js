import React, { Component } from 'react';
import '../RoomList.css';

class messageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],

     };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

handleChange(event) {
  this.setState({ input: event.target.value });
}

componentDidMount(){
  this.messagesRef.on('child_added', snapshot=>{
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.message.concat( room ) })
  });
}


showRoomMessage(message, index){
  if (message.roomId === this.props.activeRoom){
    return (
      <li key={ index } className = "message">
        <p>{message.content}</p>
        <p>From: { message.username } at { message.sentAt }</p>
      </li>
    );
  } else {
    return
  }
}

render(){
  return(
    <div className="message-holder">
      <div className="messages">
        <h1>{ this.props.activeRoomName }</h1>
        {
          this.state.messages.map(message, index) =>
            this.showRoomMessage(message, index)
          )
        }
      </div>
      <CreateMessage
        firebase= { this.prop.firebase }
        activeRoom= { this.prop.activeRoom }
        user= { this.props.user }
        />
        </div>
      );
    }
}

export default MessageList;
