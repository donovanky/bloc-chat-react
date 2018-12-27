import React, { Component } from 'react';
import Message from './Message';


class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
     };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

componentDidMount(){
  this.messagesRef.on('child_added', snapshot=>{
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) });
  });
}

showRoomMessage(message, index){
  if (message.roomId === this.props.activeRoom){
    return (
      <ul key={ index } className="message">
      <p>{message.content}</p>
      <p>From: {message.username} at {message.sentAt}</p>
      </ul>

    );
  } else {
    return
  }
}

render(){
  return(
    <div className = "message-container">
      <div className = "messages">
      <h1> {this.props.activeRoomTitle }</h1>
    {
          this.state.messages.map((message, index) =>
            this.showRoomMessage(message, index)
          )
        }
      </div>
      <Message
        firebase= { this.props.firebase}
        activeRoom= { this.props.activeRoom }
        user= { this.props.user }
        />
      </div>
      );
    }
}

export default MessageList;
