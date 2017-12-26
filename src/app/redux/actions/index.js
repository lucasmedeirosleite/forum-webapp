import { USER_SIGN_IN } from '../contants';
import UserSession from '../../domain/services/user_session';

export function signIn(user, onSuccess, onError) {
  return {
    type: USER_SIGN_IN,
    payload: new UserSession().signIn(user).then(() => onSuccess() ).catch(error => onError())
  };
}
