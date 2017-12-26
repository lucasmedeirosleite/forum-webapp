import '../spec_helper';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import APIClient from '../../lib/api_client';

describe('APIClient', () => {
  const mockedAxios = new MockAdapter(axios);
  const apiClient = new APIClient(axios);

  beforeEach(() => {
    mockedAxios.reset();
  });

  describe('#post', () => {
    let params;
    let expectedResponse;

    describe('when posting with invalid data', () => {
      beforeEach(() => {
        params = {
          user: {
            name: '',
            email: '',
            password: ''
          }
        };

        expectedResponse = {
          errors: {
            name: 'is required',
            email: 'is required',
            password: 'is required'
          }
        }

        mockedAxios
          .onPost(`${apiClient.host}/users`)
          .reply(422, expectedResponse);
      });

      it('returns 422', () => {
        return apiClient.post('users', params).catch(error => {
          expect(error.response.status).toEqual(422);
          expect(error.response.data).toEqual(expectedResponse);
        });
      });
    });

    describe('when posting to a non existing resource', () => {
      beforeEach(() => {
        params = { message: 'a message' };

        mockedAxios
          .onPost(`${apiClient.host}/inexistent-route`)
          .reply(404);
      });

      it('returns 404', () => {
        return apiClient.post('inexistent-route', params).catch(error => {
          expect(error.response.status).toEqual(404);
        });
      });
    });

    describe('when posting to a non authorized resource', () => {
      beforeEach(() => {
        params = { message: 'a message' };

        mockedAxios
          .onPost(`${apiClient.host}/topics`)
          .reply(401);
      });

      it('returns 401', () => {
        expect.assertions(1);
        return apiClient.post('topics', params).catch(error => {
          expect(error.response.status).toEqual(401);
        });
      });
    })

    describe('when posting to a resource with error', () => {
      beforeEach(() => {
        params = { message: 'a message' };

        mockedAxios
          .onPost(`${apiClient.host}/topics/1/posts`)
          .reply(500);
      });

      it('returns 500', () => {
        expect.assertions(1);
        return apiClient.post('topics/1/posts', params).catch(error => {
          expect(error.response.status).toEqual(500);
        });
      });
    });

    describe('when posting to a valid resource', () => {
      beforeEach(() => {
        params = {
          user: {
            name: 'A user name',
            email: 'user@example.com',
            password: '12345678'
          }
        };

        expectedResponse = {
          id: 1234,
          name: 'A user name',
          email: 'user@example.com'
        }

        mockedAxios
          .onPost(`${apiClient.host}/users`)
          .reply(201, expectedResponse);
      });

      it('returns 200', () => {
        return apiClient.post('users', params).then(response => {
          expect(response.status).toEqual(201);
          expect(response.data).toEqual(expectedResponse);
        });
      });
    });
  });

  describe('#delete', () => {
    let expectedResponse;

    describe('when deleting with invalid data', () => {
      beforeEach(() => {
        expectedResponse = {
          message: 'validastion failed'
        }

        mockedAxios
          .onDelete(`${apiClient.host}/users/sign_out`)
          .reply(422, expectedResponse);
      });

      it('returns 422', () => {
        return apiClient.delete('users/sign_out').catch(error => {
          expect(error.response.data).toEqual(expectedResponse);
        });
      });
    });

    describe('when deleting to a non existing resource', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/inexistent-route`)
          .reply(404);
      });

      it('returns 404', () => {
        return apiClient.delete('inexistent-route').catch(error => {
          expect(error.response.status).toEqual(404);
        });
      });
    });

    describe('when deleting to a non authorized resource', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/topics`)
          .reply(401);
      });

      it('returns 401', () => {
        return apiClient.delete('topics').catch(error => {
          expect(error.response.status).toEqual(401);
        });
      });
    });

    describe('when deleting to a resource with error', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/topics/1/posts`)
          .reply(500);
      });

      it('returns 500', () => {
        return apiClient.delete('topics/1/posts').catch(error => {
          expect(error.response.status).toEqual(500);
        });
      });
    });

    describe('when deleting to a valid resource', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/users`)
          .reply(204);
      });

      it('returns 204', () => {
        return apiClient.delete('users').then(response => {
          expect(response.status).toEqual(204);
        });
      });
    });
  });
});
