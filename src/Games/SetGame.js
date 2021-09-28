import React, { Component } from 'react';
import LineBreak from '../LineBreak';
import CardGrid from '../CardGrid/CardGrid';
import { fillSet } from '../SetUtil';
import { deepCopy, shuffleArray, randomCard } from '../Util';

export default class SetGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.buildDeck(),
      displayed: [],
      selected: new Set(),
      message: "",
      startTime: new Date(),
      errors: 0,
      mounted: false
    };

    this.activeDisplayed = [];
    this.updateDisplayed([], deepCopy(this.state.deck));

    this.state.mounted = true;
  }

  isSet(c1, c2, c3) {
      return c1 === fillSet(c2, c3);
  }

  buildDeck() {
      const deck = new Set();

      while(deck.size < 81) {
          deck.add(randomCard());
      }

      return shuffleArray(Array.from(deck));
  }

  findSet(cards) {
    for (var i = 0; i < cards.length; i++) {
      for (var j = i + 1; j < cards.length; j++) {
        for (var k = j + 1; k < cards.length; k++) {
          if (this.isSet(cards[i], cards[j], cards[k])) {
            console.log(i + " " + j + " " + k + " is a set");
            return [i, j, k];
          }
        }
      }
    }

    return [];
  }

  hasSet(cards) {
      return this.findSet(cards).length > 0;
  }

  displayCards(cnt) {
    if (cnt > this.activeDeck.length) {
        this.displayCards(this.activeDeck.length);
        return;
    }
    
    const newDisplayed = this.activeDisplayed.concat(this.activeDeck.slice(0, cnt));
    const newDeck = this.activeDeck.slice(cnt);

    this.activeDeck = newDeck;
    this.activeDisplayed = newDisplayed;
  }

  updateDisplayed(displayed, deck) {
    this.activeDisplayed = displayed;
    this.activeDeck = deck;

    while(this.activeDeck.length > 0 && (!this.hasSet(this.activeDisplayed) || this.activeDisplayed.length < 9)) {
        this.displayCards(3);
    }
    
    if (!this.hasSet(this.activeDisplayed)) {
      this.setState({message: "GAME FINISHED", finishedTime: new Date() - this.state.startTime});
    }
    else {
      if (this.state.mounted) {
        this.setState({displayed: this.activeDisplayed, deck: this.activeDeck});
      }
      else {
        this.state.displayed = this.activeDisplayed;
        this.state.deck = this.activeDeck;
      }
    }
  }

  selectHandler(index) {
      const newSelected = new Set(this.state.selected);

      if (newSelected.has(index)) {
          newSelected.delete(index);
      }
      else {
          newSelected.add(index);
      }

      console.log("New selected: ");
      console.log(newSelected)

      if (newSelected.size === 3) {
        const selectedCards = Array.from(newSelected);
        const [c1, c2, c3] = selectedCards;

        if (this.isSet(this.state.displayed[c1], this.state.displayed[c2], this.state.displayed[c3])) {
            const newDisplayed = [];
            for (var i = 0; i < this.state.displayed.length; i++) {
                if (!newSelected.has(i)) {
                    newDisplayed.push(this.state.displayed[i]);
                }
            }
            
            this.setState({
                displayed: newDisplayed,
                selected: new Set()
            });

            this.updateDisplayed(deepCopy(newDisplayed), deepCopy(this.state.deck));
        }
        else {
            this.setState({
                message: "WRONG SET",
                selected: new Set(),
                errors: this.state.errors + 1
            })
        }
      }
      else {
        this.setState({selected: newSelected});
      }
  }

  highlightSet(cnt) {
    const set = this.findSet(this.state.displayed).slice(0, cnt);

    this.setState({selected: new Set(set)});
  }

  getStats() {
    if (!this.state.finishedTime) {
        return (
            <p>Deck size: {this.state.deck.length}<br/>
                Errors: {this.state.errors}
            </p>
        );
    }

    return (
      <p>Time: {this.state.finishedTime / 1000.0}s<br/>
          Errors: {this.state.errors}
      </p>
    )
  }

  render() {
    console.log(this.state);

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

    const gridStyle = {
        width: "50%",
        height: "50%"
    }
    
    return (
      <div style={outerStyle}>

        <div style={gridStyle}>
            <CardGrid 
                cards={this.state.displayed}
                cols={3}
                onClick={(index) => this.selectHandler(index)}
                selected={this.state.selected}/>
        </div>
        
        <LineBreak />

        <div>
          <p>{this.state.message}</p>
        </div>
        
        <LineBreak />

        <div>
          {this.getStats()}
        </div>

        <LineBreak />

        <div>
          <button style={buttonStyle} onClick={() => this.highlightSet(1)}>Hint 1</button>
          <button style={buttonStyle} onClick={() => this.highlightSet(2)}>Hint 2</button>
          <button style={buttonStyle} onClick={() => this.highlightSet(3)}>Set</button>
        </div>
      </div>
    );
  }
}
