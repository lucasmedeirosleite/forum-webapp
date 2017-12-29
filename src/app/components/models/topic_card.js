import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteTopic } from '../../redux/actions/index';
import { currentUser } from '../../domain/services/user_session';

class TopicCard extends Component {
  onDelete(event) {
    event.preventDefault();

    this.props.deleteTopic(this.props.topic.id, () => {
      this.props.history.push('/topics');
    });
  }

  render() {
    const { topic } = this.props;
    const { id, title, description, date, posts, user } = topic;

    const formattedDate = date.fromNow();

    let postsCount = 0;

    if (posts && _.isArray(posts)) {
      postsCount = posts.length
    } else if (posts && _.isInteger(posts)) {
      postsCount = posts;
    }

    return (
      <section key={id} className="widget">
        <header>
          <h6>
            {title} - &nbsp;
            <span className="fw-semi-bold">
              {user ? user.name : ''}
            </span>
          </h6>

          <div className="widget-controls">
            <Link to={`/topics/${topic.id}/posts`}>
              <i className="glyphicon glyphicon-comments"></i>
            </Link>

            {user && user.id === currentUser().id ?
              <Link to={`/topics/${topic.id}`} >
                <i className="glyphicon glyphicon-edit"></i>
              </Link> : ''
            }

            {user && user.id === currentUser().id ?
              < Link to="/" onClick={this.onDelete.bind(this)}>
                <i className="glyphicon glyphicon-remove"></i>
              </Link> : ''
            }
          </div>
        </header>

        <div className="widget-body">
          <hr />
          {description}
          <hr />
          <div>
            <span><small>{formattedDate}</small></span>

            <span className="pull-xs-right">
              <small>
                <strong>{postsCount}</strong>
              </small>
              &nbsp; posts
            </span>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, { deleteTopic })(TopicCard);
