import { USER_SIGN_IN } from '../contants';
import Authenticator from '../../domain/services/authenticator';

export function signIn(user, onSuccess, onError) {
  return {
    type: USER_SIGN_IN,
    payload: new Authenticator().authenticate(user).then(() => onSuccess()).catch(() => onError())
  };
}
