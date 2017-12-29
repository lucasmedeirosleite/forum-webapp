import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import profileImage from '../../assets/images/avatar.png';

import { currentUser } from '../../domain/services/user_session';
import { deletePost } from '../../redux/actions/index';

class PostLine extends Component {
  onDelete(event) {
    event.preventDefault();
    const { id, topic_id } = this.props.post;

    this.props.deletePost(topic_id, id, () => {
      this.props.onPostDelete();
    }, () => {
      alert('Unable to delete post');
    });
  }

  render() {
    const { description, date, user } = this.props.post;
    const loggedUser = currentUser();

    return (
      <li>
        <span className="thumb-xs avatar pull-xs-left mr-sm">
          <img className="img-circle" src={profileImage} alt={user ? user.name : ''} />
        </span>

        <div className="comment-body">
          <h6 className="author fw-semi-bold fs-sm">{user ? user.name : ''} <small>{date}</small></h6>

          {user && loggedUser && user.id === loggedUser.id ?
            <Link to="/" onClick={this.onDelete.bind(this)} className="remove-topic-button pull-xs-right">
              <i className="glyphicon glyphicon-remove"></i>
            </Link> : ''
          }

          <p>{description}</p>
        </div>
      </li>
    );
  }
}

export default connect(null, { deletePost })(PostLine);
