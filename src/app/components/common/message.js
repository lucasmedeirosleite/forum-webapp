import React, { Component } from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = { hidden: false };
  }

  _messageTypeClass() {
    if(!this.props.type) {
      return "alert-info";
    }

    return `alert-${this.props.type}`;
  }

  onClick() {
    this.setState({ hidden: true });
  }

  render() {
    if (this.state.hidden) {
      return false;
    }

    return (
      <div className={`alert ${this._messageTypeClass()} alert-sm`}>
        <button onClick={this.onClick.bind(this)}
                type="button"
                className="close"
                aria-hidden="true">
          ×
        </button>
        <span className="fw-semi-bold">Attention:</span> {this.props.text}
      </div>
    );
  }
}
