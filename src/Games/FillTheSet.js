import React, { Component } from 'react';
import CardRow from '../CardRow/CardRow';
import CardGrid from '../CardGrid/CardGrid';
import { mutateCard, fillSet } from '../SetUtil';
import { shuffleArray, randomCard } from '../Util';
import LineBreak from '../LineBreak';

export default class FillTheSet extends Component {
  state = {
    cards: this.generateSet(),
    message: "",
    startTime: new Date(),
    totalTime: 0,
    corrects: 0,
    errors: 0
  }

  isSet(c1, c2, c3) {
      return c1 === fillSet(c2, c3);
  }

  answerHandler(ans) {
      if (this.isSet(this.state.cards.question[0], this.state.cards.question[1], ans)) {
        const timePassed = new Date() - this.state.startTime;
        this.setState({
          cards: this.generateSet(),
          message: "",
          startTime: new Date(),
          totalTime: this.state.totalTime + timePassed / 1000.0,
          corrects: this.state.corrects + 1
        });
      }
      else {
        this.setState({message: "Wrong", errors: this.state.errors + 1});
      }
  }

  generateSet() {
    const cards = [randomCard(), randomCard()];

    if (cards[0] === cards[1]) {
      return this.generateSet();
    }

    const choiceSet = new Set();
    const realFill = fillSet(cards[0], cards[1]);
    choiceSet.add(realFill);

    while(choiceSet.size < 9) {
      choiceSet.add(mutateCard(realFill));
    }

    while(choiceSet.size < 12) {
      choiceSet.add(randomCard());
    }

    return {
        question: cards,
        answers: shuffleArray(Array.from(choiceSet))
    };
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

    const gridStyle = {
        width: "75%",
        height: "75%"
    }
    
    return (
      <div style={outerStyle}>
        <div style={style}>
            <CardRow cards={this.state.cards.question} />
        </div>
        
        <LineBreak />
        <LineBreak />
        
        <div style={gridStyle}>
            <CardGrid 
                cards={this.state.cards.answers}
                cols={4}
                onClick={(index) => this.answerHandler(this.state.cards.answers[index])}/>
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
