import _ from 'lodash';
import { Component } from 'react'
import { currentUser } from '../../domain/services/user_session';


export default class BasePage extends Component {
  componentWillMount() {
    if (_.isEmpty(currentUser())) {
      this.props.history.push('/users/sign_in');
    }
  }
}
