import APIClient from '../../../lib/api_client';
import User from '../models/user';

const RESOURCE = 'users';

export function currentUser() {
  const user = localStorage.getItem('current_user');

  if (user != null) {
    return JSON.parse(user);
  }

  return null;
}

export default class UserSession {
  constructor(apiClient = new APIClient(), storage = localStorage) {
    this.apiClient = apiClient;
    this.storage = storage;
  }

  signIn(userData) {
    const params = { user: userData };
    return this.apiClient.post(`${RESOURCE}/sign_in`, params).then(response => {
      const { id, name, email } = response.data;
      const token = response.headers['Authorization'] || response.headers.authorization;
      const user = new User(id, name, email, token);
      this.storage.setItem('current_user', user.toJSON());
      return user;
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      if (this.storage.getItem('current_user') == null) {
        reject({ success: true, message: 'User already signed out' });
      } else {
        this.apiClient.delete(`${RESOURCE}/sign_out`).then(() => {
          this.storage.removeItem('current_user');
          resolve(true);
        }).catch((error) => {
          reject({ success: false, message: 'Unable to sign out user' })
        });
      }
    });
  }
}
