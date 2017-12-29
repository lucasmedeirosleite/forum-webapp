import React, { Component } from 'react';

import profileImage from '../../assets/images/avatar.png';

export default class PostLine extends Component {
  render() {
    const { description, date, user } = this.props.post;

    return (
      <li>
        <span className="thumb-xs avatar pull-xs-left mr-sm">
          <img className="img-circle" src={profileImage} alt={user ? user.name : ''} />
        </span>

        <div className="comment-body">
          <h6 className="author fw-semi-bold fs-sm">{user ? user.name : ''} <small>{date}</small></h6>
          <p>{description}</p>
        </div>
      </li>
    );
  }
}
