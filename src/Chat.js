import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "./axios";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import "./Chat.css";

function Chat({ roomMessages, roomId, roomName, user }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/rooms/messages/new", {
      _id: roomId,
      message: {
        message: input,
        name: user.displayName,
        timestamp: Date.now(),
        userId: user.uid,
      },
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {roomMessages.map((message) => {
          const date = new Date(message.timestamp);
          const formattedTime = date.toUTCString();

          return (
            <p
              key={message._id}
              className={`chat__message ${
                user.uid === message.userId && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{formattedTime}</span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
