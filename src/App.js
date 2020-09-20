import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./App.css";
import axios from "./axios.js";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    axios.get("/rooms/sync").then((response) => {
      setRooms(response.data);
    });
  }, [roomId, roomMessages]);

  useEffect(() => {
    const pusher = new Pusher("5b374abd250e29ae1de0", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("updated", function (message) {
      setRoomMessages([...roomMessages, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [roomMessages]);

  const getRoomMessages = (messages, roomId, name) => {
    setRoomMessages(messages);
    setRoomId(roomId);
    setRoomName(name);
  };

  return (
    <div className="app">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="app__body">
          <Sidebar
            rooms={rooms}
            getRoomMessages={getRoomMessages}
            setRooms={setRooms}
            user={user}
          />
          <Chat
            roomMessages={roomMessages}
            roomId={roomId}
            roomName={roomName}
            defaultRoom={rooms[0]}
            user={user}
          />
        </div>
      )}
    </div>
  );
}

export default App;
