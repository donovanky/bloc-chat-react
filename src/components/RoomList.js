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
      const rooms = snapshot.val();
      rooms.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( rooms ) })
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
          this.state.rooms.map((rooms, index) =>
            <div key={ index }><h3>{ rooms.name }</h3></div>
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
