import axios from 'axios';

export default class APIClient {
  constructor(httpClient = axios, storage = localStorage) {
    this.httpClient = httpClient;
    this.storage = storage;
  }

  get(resource, params = {}) {
    return this.httpClient.get(resource, this._config(params));
  }

  post(resource, params = {}) {
    return this.httpClient.post(`/${resource}`, params, this._config());
  }

  delete(resource) {
    return this.httpClient.delete(`/${resource}`, {}, this._config());
  }

  _config(params = null) {
    if (params !== null) {
      return {
        headers: this._headers(),
        params
      };
    }

    return {
      headers: this._headers()
    };
  }

  _headers() {
    const headers = {
      'Accept': 'application/vnd.forum.com; version=1',
      'Content-Type': 'application/json'
    }

    const token = this._currentToken();

    if (token != null) {
      headers['Authorization'] = token;
    }

    return headers;
  }

  _currentUser() {
    const user = this.storage.getItem('current_user');
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  _currentToken() {
    const user = this._currentUser();
    if (user != null) {
      return user.token;
    }

    return null;
  }
}
