import React, { Component } from 'react'

export default class Card extends Component {
  renderTitle() {
    if (this.props.title) {
      return (
        <header>
          <h6>
            {this.props.title}
          </h6>
        </header>
      );
    }
  }

  render() {
    return (
      <section className="widget">
        {this.renderTitle()}

        <div className="widget-body">
          {this.props.children}
        </div>
      </section>
    );
  }
}
