import './App.css';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import React from "react";
import Game from "./Game"

const _client = new W3CWebSocket('ws://127.0.0.1:1300');

function App() {
  _client.onopen = () => {
    console.log('Client Connected');
  };

  return (
      <Game client={_client}/>
  );
}

export default App;
