import {
  USER_SIGN_IN,
  USER_SIGN_UP,
  USER_SIGN_OUT,
  LIST_TOPICS,
  FETCH_TOPIC,
  CREATE_TOPIC,
  UPDATE_TOPIC,
  DELETE_TOPIC,
  CREATE_POST
} from '../constants';

import UserSession from '../../domain/services/user_session';
import TopicsRepository from '../../domain/repositories/topics_repository';
import PostsRepository from '../../domain/repositories/posts_repository';

export function signIn(user, onSuccess, onError) {
  return {
    type: USER_SIGN_IN,
    payload: new UserSession()
      .signIn(user)
      .then(() => onSuccess() )
      .catch(error => onError())
  };
}

export function signUp(user, onSuccess, onError) {
  return {
    type: USER_SIGN_UP,
    payload: new UserSession()
      .signUp(user)
      .then(() => onSuccess())
      .catch(error => onError())
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

export function fetchTopic(id) {
  return {
    type: FETCH_TOPIC,
    payload: new TopicsRepository().find(id)
  }
}

export function createTopic(topicParams = {}, onSuccess, onError) {
  return {
    type: CREATE_TOPIC,
    payload: new TopicsRepository()
      .create(topicParams)
      .then(topic => onSuccess(topic))
      .catch(error => onError(error))
  }
}

export function updateTopic(id, topicParams = {}, onSuccess, onError) {
  return {
    type: UPDATE_TOPIC,
    payload: new TopicsRepository()
      .update(id, topicParams)
      .then(topic => onSuccess(topic))
      .catch(error => onError(error))
  }
}

export function deleteTopic(id, callback) {
  new TopicsRepository().delete(id).then(() => {
    callback();
  });

  return {
    type: DELETE_TOPIC,
    payload: id
  }
}

export function createPost(topicId, postParams = {}, onSuccess, onError) {
  return {
    type: CREATE_POST,
    payload: new PostsRepository()
      .createFrom(topicId, postParams)
      .then(post => {
        onSuccess(post);
        return post;
      }).catch(error => {
        onError(error);
        return error;
      })
  }
}
