import React, {useReducer} from "react";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import Board from "./Board";
import Table from "./Table";

const _width = 640;
const _height = 480;
const _client = new W3CWebSocket('ws://127.0.0.1:1300');
const _initialState = {history: []};

const reducer = (state, hit) => {return {history: [...state.history, hit]}}

function Game() {
    const [_state, _appendHit] = useReducer(reducer, _initialState);

    _client.onopen = () => {
        console.log('Client Connected');
    };

    _client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer['type'] === 'hit') {
            let hit = dataFromServer['hit'];
            _appendHit(hit);
        }
    };

    function stopGame() {
        try {
            _client.send(JSON.stringify({'type': 'stop'}));
            console.log("Stop Game");
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="game">
            <Board hits={_state.history} height={_height} width={_width}/>

            <div className="game-info">
                <button onClick={() => stopGame()}>Stop Game</button>
                <Table hits={_state.history}/>
            </div>
        </div>
    );
}

export default Game;