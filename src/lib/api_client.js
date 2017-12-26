import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST

export default class APIClient {
  constructor(httpClient = axios, host = API_HOST, storage = localStorage) {
    this.httpClient = httpClient;
    this.host = host;
    this.storage = storage;
  }

  post(resource, params = {}) {
    const url = `${this.host}/${resource}`;
    return this.httpClient.post(url, params, this._config());
  }

  delete(resource) {
    const url = `${this.host}/${resource}`;
    return this.httpClient.delete(url, {}, this._config());
  }

  _config() {
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
