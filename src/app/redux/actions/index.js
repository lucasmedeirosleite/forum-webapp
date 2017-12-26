import { USER_SIGN_IN, USER_SIGN_OUT } from '../contants';
import UserSession from '../../domain/services/user_session';

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
