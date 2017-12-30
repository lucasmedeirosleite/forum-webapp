import '../spec_helper';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import APIClient from '../../lib/api_client';
import PostsRepository from '../../app/domain/repositories/posts_repository';

describe('TopicsRepository', () => {
  const mockedAxios = new MockAdapter(axios);
  const apiClient = new APIClient(axios);
  const repository = new PostsRepository(apiClient);

  beforeEach(() => {
    mockedAxios.reset();
  });

  describe('#createFrom', () => {
    describe('when validation fails', () => {
      const request = {
        description: ''
      };
      const toReturn = {
        errors: {
          description: ["can't be blank"]
        }
      };

      beforeEach(() => {
        mockedAxios
          .onPost(`${apiClient.host}/topics/1/posts`, { post: request })
          .reply(422, toReturn);
      });

      it('returns an error', () => {
        return repository.createFrom(1, request).catch(({ response }) => {
          expect(response.status).toEqual(422);
          expect(response.data).toEqual(toReturn);
        });
      });
    });

    describe('when succeeds', () => {
      const request = {
        description: 'A description'
      };
      const toReturn = {
        id: 1,
        description: 'A description',
        date: '2017-12-30 11:00:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        topic_id: 1
      };

      beforeEach(() => {
        mockedAxios
          .onPost(`${apiClient.host}/topics/1/posts`, { post: request })
          .reply(201, toReturn);
      });

      it('returns the created post', () => {
        return repository.createFrom(1, request).then(post => {
          expect(post.id).toEqual(toReturn.id);
          expect(post.description).toEqual(toReturn.description);
          expect(post.user).toEqual(toReturn.user);
          expect(post.topic).toEqual(toReturn.topic_id);
          expect(post.date).toEqual(toReturn.date);
        });
      });
    });
  });

  describe('#deleteFrom', () => {
    describe('when fails', () => {
      beforeEach(() => {
        const url = `${apiClient.host}/topics/1/posts/1`;

        mockedAxios
          .onDelete(url)
          .reply(500);
      });

      it('returns an error', () => {
        return repository.deleteFrom(1, 1).catch(({ response }) => {
          expect(response.status).toEqual(500);
        });
      });
    });

    describe('when deleted', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/topics/1/posts/1`)
          .reply(204);
      });

      it('returns succeeds', () => {
        return repository.deleteFrom(1, 1).then(response => {
          expect(response.status).toEqual(204);
        });
      });
    });
  });
});
