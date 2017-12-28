import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  LIST_TOPICS,
  CREATE_TOPIC
} from '../contants';

import UserSession from '../../domain/services/user_session';
import TopicsRepository from '../../domain/repositories/topics_repository';

export function signIn(user, onSuccess, onError) {
  return {
    type: USER_SIGN_IN,
    payload: new UserSession().signIn(user).then(() => onSuccess() ).catch(error => onError())
  };
}

export function signOut(onSuccess, onError) {
  return {
    type: USER_SIGN_OUT,
    payload: new UserSession().signOut().then(() => onSuccess()).catch((error) => onError(error))
  }
}

export function listTopics(term = null) {
  return {
    type: LIST_TOPICS,
    payload: new TopicsRepository().all(term)
  }
}

export function createTopic(topicParams = {}, onSuccess, onError) {
  return {
    type: CREATE_TOPIC,
    payload: new TopicsRepository().create(topicParams).then(topic => onSuccess(topic)).catch(error => onError(error))
  }
}
