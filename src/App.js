import React, { Component } from 'react';
import FillTheSet from './Games/FillTheSet';
import SetOrNot from './Games/SetOrNot';
import SetGame from './Games/SetGame';

class App extends Component {
  STATES = {
    MENU: "menu",
    SET_OR_NOT: "setornot",
    FILL_THE_SET: "filltheset",
    SET: "set"
  }

  state = {
    activeGame: this.STATES.MENU
  };

  changeState(newState) {
    this.setState({activeGame: newState});
  }

  renderMenu() {
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
      <div>
        <div>
          <button style={buttonStyle} onClick={() => this.changeState(this.STATES.SET_OR_NOT)}>SET OR NOT</button>
        </div>
      
        <div>
          <button style={buttonStyle} onClick={() => this.changeState(this.STATES.FILL_THE_SET)}>FILL THE SET</button>
        </div>

        <div>
          <button style={buttonStyle} onClick={() => this.changeState(this.STATES.SET)}>SET</button>
        </div>
      </div>
    )
  }

  renderGame(state) {
    switch(state) {
      case this.STATES.MENU:
        return this.renderMenu();
      case this.STATES.SET_OR_NOT:
        return <SetOrNot />
      case this.STATES.FILL_THE_SET:
        return <FillTheSet />
      case this.STATES.SET:
        return <SetGame />
    }
  }

  render() {
    const style = {
      height: "80%",
      width: "80%"
    };

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
      <div style={style}>
        <div>
          <button style={buttonStyle} onClick={() => this.changeState(this.STATES.MENU)}>MENU</button>
        </div>

        {this.renderGame(this.state.activeGame)}
      </div>
    )
  }
}

export default App;
