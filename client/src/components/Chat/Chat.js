import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

// useEffect hook lets us perform side effects/ lifecycle methods in gunction components

// location comes from react router which gives us a prop called location
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    console.log(socket);
    // basically we only rerender when these two values ENDPOINT or location.search change
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
