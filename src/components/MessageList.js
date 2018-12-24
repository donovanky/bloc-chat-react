import React, { Component } from 'react';


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
      <p key = {index}>{message.content}</p>
    );
  } else {
    return
  }
}

render(){
  return(
    <div>
    {
          this.state.messages.map((message, index) =>
            this.showRoomMessage(message, index)
          )
        }
      </div>
      );
    }
}

export default MessageList;
