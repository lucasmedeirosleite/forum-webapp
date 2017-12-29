import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostForm from './post_form';
import PostLine from './post_line';

export default class TopicPostsCard extends Component {
  renderPosts() {
    if (_.isEmpty(this.props.topic) || _.isEmpty(this.props.topic.posts)) {
      return '';
    }

    return this.props.topic.posts.map(post => {
      return <PostLine key={post.id} post={post} onPostDelete={this.props.onPostDelete} />
    });
  }

  render() {
    const { title, description, user, date, posts } = this.props.topic;
    const formattedDate = date.fromNow();

    return(
      <section className="event">
        <h5 className="event-heading">
          {title ?
            <Link to="/" onClick={event => event.preventDefault()}>{title}</Link>
            : ''
          }
          <small>&nbsp;-&nbsp;{user ? user.name : ''}</small>
        </h5>

        <p className="text-muted">{formattedDate}</p>

        <p>
          {description}
        </p>

        <footer>
          <div className="clearfix">
            <ul className="post-links mt-sm pull-xs-left">
              <li>
                {posts ?
                  <Link to="/" onClick={event => event.preventDefault()}>{posts.length} posts</Link>
                  : ''
                }
              </li>
            </ul>
          </div>

          <ul className="post-comments mt-sm">
            {this.renderPosts()}

            <li>
              <PostForm onSubmit={this.props.onPostSubmit} />
            </li>
          </ul>
        </footer>
      </section>
    );
  }
}
