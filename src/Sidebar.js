import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import axios from "./axios";

function Sidebar({ rooms, getRoomMessages, setRooms, user }) {
  const onAddNewChat = async () => {
    const newRoomName = prompt("Add new chat room: ");

    if (newRoomName != null) {
      await axios.post("/rooms/room/new", {
        name: newRoomName,
      });
      axios.get("/rooms/sync").then((response) => {
        setRooms(response.data);
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <h3>{user.displayName}</h3>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <div className="sidebar__chatAdd" onClick={onAddNewChat}>
          <h3>Add new chat +</h3>
        </div>
        {rooms.map((room) => (
          <SidebarChat
            key={room._id}
            name={room.name}
            messages={room.messages}
            lastMessage={
              room.messages.length
                ? room.messages[room.messages.length - 1].message
                : ""
            }
            getRoomMessages={getRoomMessages}
            _id={room._id}
            defaultRoom={rooms[0]}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
