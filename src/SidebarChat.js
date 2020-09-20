import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

function SidebarChat({
  name,
  messages,
  getRoomMessages,
  _id,
  lastMessage,
  defaultRoom,
}) {
  useEffect(() => {
    getRoomMessages(defaultRoom.messages, defaultRoom._id, defaultRoom.name);
  }, []);

  return (
    <div
      className="sidebarChat"
      onClick={(e) => getRoomMessages(messages, _id, name)}
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
