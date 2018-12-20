import React, { Component } from 'react';
import '../RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(event) {
    this.setState({newRoomTitle: event.target.value});
  }

  createRoom(event){
    event.preventDefault();
    const newRoomTitle = this.state.newRoomName;
    this.roomsRef.push({
      name: newRoomTitle
    });
    const emptyString = '';
    this.setState({ newRoomTitle: emptyString });

  }

  render() {
    return(
      <nav className="container">
        <h1>Bloc Chat</h1>
        {
          this.state.rooms.map((room, index) =>
            <div key={ index }><h3>{ room.name }</h3></div>
          )
        }
        {/* new room creator below*/}
        <form onSubmit={ (event) => this.createRoom(event)}>
          <label>
            Create a new room:
          </label>
          <input
            type = "text"
            value ={ this.state.newRoomTitle }
            onChange = { (event) => this.handleChange(event) }
          />
          <input type="submit" value="Create Room" />
        </form>
      </nav>
    );
  }
}


export default RoomList;
