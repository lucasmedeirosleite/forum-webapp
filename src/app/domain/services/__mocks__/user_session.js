export function currentUser() {
  return null;
}


export default class UserSession {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  signIn(userData) {
    return new Promise((resolve, reject) => {
      if (userData.email === 'email@example.com' && userData.password === '12345678') {
        const user = {
          id: 1234,
          name: 'User',
          email: userData.email,
          token: '1234-5678'
        }
        this.storage.setItem('current_user', JSON.stringify(user));
        revolve(user);
      } else {
        reject();
      }
    });
  }
}
