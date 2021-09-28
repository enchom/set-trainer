import React from 'react'

const cardRow = (props) => {
    const divStyle = {
        display: "flex",
        width: "100%",
        justifyContent: "center"
    };
    
    const numCards = props.cards.length;
    const percentages = Math.max(1, Math.floor(100 / numCards)) + "%";
    const innerDivStyle = {
        padding: "5px",
        width: percentages
    };

    const cardImages = props.cards.map(card => require("../images/" + card + ".png"));

    let onClickAction = (index) => {
        if (props.onClick) {
            props.onClick(index);
        }
    }

    const cardHtmlElements = cardImages.map((imgSrc, index) => {
        const borderStyle = (props.selected && props.selected.has(index))
            ? {border: "4px solid purple"}
            : undefined;

        return (
            <div style={innerDivStyle} onClick={() => onClickAction(index)}>
                <img src={imgSrc} width="100%" style={borderStyle}/>
            </div>
        )
    })
    return (
        <div style={divStyle}>
            {cardHtmlElements}
        </div>
    )
}

export default cardRow