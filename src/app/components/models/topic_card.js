import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteTopic } from '../../redux/actions/index';

class TopicCard extends Component {
  onDelete(event) {
    event.preventDefault();

    this.props.deleteTopic(this.props.topic.id, () => {
      this.props.history.push('/topics');
    });
  }

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
            <Link to="/" onClick={this.onDelete.bind(this)}>
              <i className="glyphicon glyphicon-remove"></i>
            </Link>
          </div>
        </header>

        <div className="widget-body">
          {this.props.topic.description}
        </div>
      </section>
    );
  }
}

export default connect(null, { deleteTopic })(TopicCard);
