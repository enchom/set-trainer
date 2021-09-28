import React, { Component } from 'react';
import CardRow from '../CardRow/CardRow';
import { mutateCard, fillSet } from '../SetUtil';
import { randomInteger, randomCard } from '../Util';
import LineBreak from '../LineBreak';

export default class SetOrNot extends Component {
  state = {
    cards: this.generateSet(),
    message: "",
    startTime: new Date(),
    totalTime: 0,
    corrects: 0,
    errors: 0
  }

  isSet() {
    return this.state.cards[2] === fillSet(this.state.cards[0], this.state.cards[1]);
  }

  generateSet() {
    const cards = [randomCard(), randomCard()];

    if (cards[0] === cards[1]) {
      return this.generateSet();
    }

    if (randomInteger(0, 1) === 0) {
      cards.push(fillSet(cards[0], cards[1]));
    }
    else {
      cards.push(mutateCard(fillSet(cards[0], cards[1])));
    }

    return cards;
  }

  responseHandler = (response) => {
    if (response === this.isSet()) {
      this.setState({
        cards: this.generateSet(),
        message: "",
        corrects: this.state.corrects + 1,
        totalTime: this.state.totalTime + (new Date() - this.state.startTime) / 1000.0,
        startTime: new Date(),
      });
    }
    else {
      this.setState({
        message: "Wrong",
        errors: this.state.errors + 1
      });
    }
  }

  getStats() {
    return (
      <p>Time: {this.state.totalTime / this.state.corrects}s<br/>
          Errors: {this.state.errors}<br/>
          Corrects: {this.state.corrects}
      </p>
    )
  }

  render() {
    const style = {
      width: "50%",
      height: "50%",
      margin: "50px"
    };

    const outerStyle = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }

    const buttonStyle = {
      backgroundColor: "#008CBA",
      border: "none",
      color: "white",
      padding: "15px 32px",
      margin: "20px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px"
    }
    
    return (
      <div style={outerStyle}>
        <div style={style}>
          <CardRow cards={this.state.cards} />
        </div>
        
        <LineBreak />

        <div>
          <button style={buttonStyle} onClick={() => this.responseHandler(true)}>SET</button>
          <button style={buttonStyle} onClick={() => this.responseHandler(false)}>NOT SET</button>
        </div>

        <LineBreak />

        <div>
          <p>{this.state.message}</p>
        </div>

        <LineBreak />

        <div>
          {this.getStats()}
        </div>
      </div>
      
    );
  }
}
