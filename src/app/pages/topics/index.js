import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BasePage from '../../components/common/base_page';
import AppContainer from '../../components/containers/app_container';
import Breadcrumb from '../../components/navigation/breadcrumb';
import Message from '../../components/common/message';
import TopicCard from '../../components/models/topic_card';

import { listTopics } from '../../redux/actions/index';

class Index extends BasePage {
  componentDidMount() {
    this.props.listTopics();
  }

  onSearch(term) {
    this.props.listTopics(term);
  }

  renderTopics() {
    if (_.isEmpty(this.props.topics)) {
      return (
        <Message type="warning" text="No topics yet, please add one." />
      );
    }

    return _.map(this.props.topics, topic => {
      return <TopicCard key={topic.id} topic={topic} history={this.props.history} />
    });
  }

  render() {
    return (
      <AppContainer onSearch={this.onSearch.bind(this)} history={this.props.history} >
        <Breadcrumb>
          <li className="active">Topics</li>
        </Breadcrumb>

        <h1 className="page-title">Topics</h1>

        <div className="row">
          <div className="col-lg-12">
            {this.renderTopics()}
          </div>
        </div>
      </AppContainer>
    );
  }
}

function mapStateToProps(state) {
  return { topics: state.topics };
}

export default connect(mapStateToProps, { listTopics })(Index);
