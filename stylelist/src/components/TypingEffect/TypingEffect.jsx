import React, { Component } from "react";
import "./TypingEffect.css";
export default class TypingEffect extends Component {
  constructor(props) {
    super(props);
    this.state={
      textColor: this.props.colorWhite ? "text-dark" : "text-white"
    }
  }
  render() {
    return (
      <div className={"type-effect-container " + this.state.textColor}>
  <h3>{this.props.word}</h3>
      </div>
    );
  }
}
