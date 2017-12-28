import React, { Component } from 'react'

export default class TopicCard extends Component {
  render() {
    return (
      <section className="widget">
        <header>
          <h6>
            {this.props.topic.title} - <span className="fw-semi-bold">Lucas Medeiros</span>
          </h6>

          <div className="widget-controls">
            <a href="/"><i className="glyphicon glyphicon-comments"></i></a>
            <a href="/"><i className="glyphicon glyphicon-edit"></i></a>
            <a href="/" data-widgster="close"><i className="glyphicon glyphicon-remove"></i></a>
          </div>
        </header>

        <div className="widget-body">
          {this.props.topic.description}
        </div>
      </section>
    );
  }
}
