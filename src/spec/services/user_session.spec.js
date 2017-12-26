import '../spec_helper';

import UserSession from '../../app/domain/services/user_session';
import APIClient from '../../lib/api_client';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('UserSession', () => {
  const mockedAxios = new MockAdapter(axios);
  const apiClient = new APIClient(axios);
  const userSession = new UserSession(apiClient);

  const user = {
    id: 1234,
    name: 'A user name',
    email: 'email@example.com',
    token: '1234-5678'
  }

  describe('#singIn', () => {
    const params = {
      email: 'user@example.com',
      password: '12345678'
    };
    let expectedResponse;

    describe('when authentication fails', () => {
      expectedResponse = {
        error: 'Invalid email or password'
      };

      beforeEach(() => {
        mockedAxios
          .onPost(`${apiClient.host}/users/sign_in`, { user: params })
          .reply(401, expectedResponse);
      });

      it('does not return authenticated user', () => {
        return userSession.signIn(params).catch(({ response }) => {
          expect(response.status).toEqual(401);
          expect(response.data).toEqual(expectedResponse);
        });
      });
    });

    describe('when authentication succeeds', () => {
      let expectedHeaders = { Authorization: 'Bearer application-token' };

      beforeEach(() => {
        mockedAxios.reset();

        expectedResponse = {
          id: 1234,
          name: 'A user name',
          email: 'user@example.com'
        };

        mockedAxios
          .onPost(`${apiClient.host}/users/sign_in`, { user: params })
          .reply(200, expectedResponse, expectedHeaders);
      })

      it('returns the authenticated user', () => {
        return userSession.signIn(params).then(user => {
          expect(user.id).toEqual(1234);
          expect(user.name).toEqual('A user name');
          expect(user.email).toEqual('user@example.com');
          expect(user.token).toEqual('Bearer application-token');

          const savedUser = JSON.parse(localStorage.getItem('current_user'));

          expect(savedUser.id).toEqual(1234);
          expect(savedUser.name).toEqual('A user name');
          expect(savedUser.email).toEqual('user@example.com');
          expect(savedUser.token).toEqual('Bearer application-token');
        });
      });
    });
  });

  describe('#signOut', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    describe('when current user not present', () => {
      it('signs out the user smoothly', () => {
        return userSession.signOut().catch(error => {
          expect(error.success).toEqual(true);
          expect(error.message).toEqual('User already signed out');
        });
      })
    });

    describe('when error happens', () => {
      beforeEach(() => {
        localStorage.setItem('current_user', JSON.stringify(user));

        mockedAxios
          .onDelete(`${apiClient.host}/users/sign_out`)
          .reply(500);
      });

      it('warns an error happened', () => {
        return userSession.signOut().catch(error => {
          expect(error.success).toEqual(false);
          expect(error.message).toEqual('Unable to sign out user');
        });
      })
    });

    describe('when current user present', () => {
      beforeEach(() => {
        mockedAxios.reset();

        localStorage.setItem('current_user', JSON.stringify(user));

        mockedAxios
          .onDelete(`${apiClient.host}/users/sign_out`)
          .reply(204);
      });

      it('signs out the user', () => {
        return userSession.signOut().then(response => {
          expect(response).toEqual(true);
          expect(localStorage.getItem('current_user')).toBeNull();
        });
      });
    });
  });
});

