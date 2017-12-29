import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppContainer from '../../components/containers/app_container';
import Breadcrumb from '../../components/navigation/breadcrumb';
import TopicPostsCard from '../../components/models/topic_posts_card';

import { fetchTopic, createPost } from '../../redux/actions';

class Index extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTopic(id);
  }

  onPostSubmit(values) {
    const { id } = this.props.match.params;

    this.props.createPost(id, values, (post) => {
      this.props.fetchTopic(id);
    }, () => {
      alert('Unable to create post');
    });
  }

  render() {
    const pageLabel = `Topic #${this.props.match.params.id} posts`;

    return(
      <AppContainer history={this.props.history} >
        <Breadcrumb>
          <li><Link to="/topics">Topics</Link></li>
          <li className="active">{pageLabel}</li>
        </Breadcrumb>

        <h1 className="page-title">{pageLabel}</h1>

        <div className="row">
          <div className="col-lg-12">
            <TopicPostsCard
               onPostSubmit={this.onPostSubmit.bind(this)}
               topic={this.props.topic || {}} />
          </div>
        </div>
      </AppContainer>
    );
  }
}

function mapStateToProps({ topics, posts }, ownProps) {
  const topic = topics[ownProps.match.params.id];
  return { topic };
}

export default connect(mapStateToProps, { fetchTopic, createPost })(Index);
