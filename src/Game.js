import React, {useReducer} from "react";

import {w3cwebsocket as W3CWebSocket} from "websocket";
import {v4 as uuidv4} from 'uuid';
import {Circle, Layer, Stage} from "react-konva";

const _width = 640;
const _height = 480;
const _client = new W3CWebSocket('ws://127.0.0.1:1300');
const _initialState = {history: []};

function ListItem(props) {
    return (<li key={uuidv4()}>
        <div>{props.value.date} - {props.value.x} x {props.value.y}</div>
    </li>);
}

function HitsList(props) {
    return (
        props.hits.map((hit) => {
                return <ListItem key={uuidv4()} value={hit}/>
            }
        )
    );
}

function reducer(state, hit) {
    return {history: state.history.concat([hit])}
}

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

    const hits = _state.history.map(hit =>
        <Circle x={hit.x} y={hit.y} radius={5} fill="black"/>
    );

    return (
        <div className="game">
            <div className="game-board">
                <Stage width={_width} height={_height}>
                    <Layer>
                        <Circle x={_width / 2} y={_height / 2} radius={_height / 2} fill="#c6c6c6"/>
                        <Circle x={_width / 2} y={_height / 2} radius={_height / 2 / 2} fill="#b0b0b0"/>
                        <Circle x={_width / 2} y={_height / 2} radius={_height / 2 / 2 / 2 / 2}
                                fill="#6e6e6e"/>
                        {hits}
                    </Layer>
                </Stage>
            </div>
            <div className="game-info">
                <button onClick={() => stopGame()}>Stop Game</button>
                <ol className="shots-list">
                    <HitsList hits={_state.history}/>
                </ol>
            </div>
        </div>
    );
}

export default Game;