import {v4 as uuidv4} from 'uuid';

function Table(props) {
    return (
        <ol className="shots-list">
            {
                props.hits.map((hit) => {
                        return (<li key={uuidv4()}>
                            <div>{hit.date} - {hit.x} x {hit.y}</div>
                        </li>)
                    }
                )
            }
        </ol>
    );
}

export default Table;