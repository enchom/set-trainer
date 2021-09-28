import React from 'react'
import CardRow from '../CardRow/CardRow';

const cardGrid = (props) => {
    const divStyle = {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    };

    const breakStyle = {
        flexBasis: "100%",
        height: 0
    };

    let onClickAction = offset => {
        return index => {
            if (props.onClick) {
                props.onClick(index + offset);
            }
        }
    }
        
    let cur = 0;
    const selectedArr = props.selected ? Array.from(props.selected) : [];

    const rows = [];
    while(cur < props.cards.length) {
        rows.push(
            <CardRow 
                cards={props.cards.slice(cur, Math.min(props.cards.length, cur + props.cols))}
                onClick={onClickAction(cur)}
                selected={new Set(selectedArr.filter(x => x >= cur && x < cur + props.cols).map(x => x - cur))}/>
        )
        rows.push(<div style={breakStyle}></div>);

        cur += props.cols;
    }

    return (
        <div style={divStyle}>
            {rows}
        </div>
    )
}

export default cardGrid