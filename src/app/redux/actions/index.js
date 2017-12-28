import { USER_SIGN_IN, USER_SIGN_OUT, LIST_TOPICS } from '../contants';
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
