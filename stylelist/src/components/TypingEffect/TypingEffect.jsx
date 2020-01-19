import React, { Component } from "react";
import "./TypingEffect.css";
export default class TypingEffect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="type-effect-container">
  <h3>{this.props.word}</h3>
      </div>
    );
  }
}
