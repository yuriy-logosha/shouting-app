import {v4 as uuidv4} from 'uuid';
import {Circle, Layer, Stage} from "react-konva";

function Board(props) {
    const _width = props.width;
    const _height = props.height;
    const _hits = props.hits;

    function Circles() {
        return (_hits.map(hit => {
                return (<Circle x={hit.x} y={hit.y} radius={5} fill="black" key={uuidv4()}/>)
            }
        ));
    }

    return (
        <div className="game-board">
            <Stage width={_width} height={_height}>
                <Layer>
                    <Circle x={_width / 2} y={_height / 2} radius={_height / 2} fill="#c6c6c6"/>
                    <Circle x={_width / 2} y={_height / 2} radius={_height / 2 / 2} fill="#b0b0b0"/>
                    <Circle x={_width / 2} y={_height / 2} radius={_height / 2 / 2 / 2 / 2}
                            fill="#6e6e6e"/>
                    <Circles/>
                </Layer>
            </Stage>
        </div>
    );
}

export default Board;