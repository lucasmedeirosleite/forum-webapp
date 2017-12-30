import '../spec_helper';

import moment from 'moment';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import APIClient from '../../lib/api_client';
import TopicsRepository from '../../app/domain/repositories/topics_repository';

describe('TopicsRepository', () => {
  const mockedAxios = new MockAdapter(axios);
  const apiClient = new APIClient(axios);
  const repository = new TopicsRepository(apiClient);

  beforeEach(() => {
    mockedAxios.reset();
  });

  describe('#all', () => {
    describe('with error from server', () => {
      beforeEach(() => {
        const url = `${apiClient.host}/topics`;

        mockedAxios
          .onGet(url)
          .reply(500);
      });

      it('returns an error', () => {
        return repository.all().catch(({ response }) => {
          expect(response.status).toEqual(500);
        });
      });
    });

    describe('with no term passed', () => {
      const toReturn = {
        id: 1234,
        title: 'A title',
        description: 'A description',
        date: '2017-04-01 14:20:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        posts_count: 1
      }

      beforeEach(() => {
        const url = `${apiClient.host}/topics`;

        mockedAxios
          .onGet(url)
          .reply(200, [toReturn]);
      });

      it('returns succeeds', () => {
        return repository.all().then(response => {
          const topic = response[0];
          expect(topic.id).toEqual(toReturn.id);
          expect(topic.title).toEqual(toReturn.title);
          expect(topic.description).toEqual(toReturn.description);
          expect(topic.user).toEqual(toReturn.user);
          expect(topic.posts).toEqual(toReturn.posts_count);
          const date = moment.utc(toReturn.date, 'YYYY-MM-DD HH:mm:ss');
          expect(topic.date.isSame(date)).toBe(true);
        });
      });
    });

    describe('with term passed', () => {
      const toReturn = {
        id: 1234,
        title: 'A title',
        description: 'A description',
        date: '2017-04-01 14:20:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        posts_count: 1
      }

      beforeEach(() => {
        const url = `${apiClient.host}/topics`;

        mockedAxios
          .onGet(url)
          .reply(200, [toReturn]);
      });

      it('returns succeeds', () => {
        return repository.all('tit').then(response => {
          const topic = response[0];
          expect(topic.id).toEqual(toReturn.id);
          expect(topic.title).toEqual(toReturn.title);
          expect(topic.description).toEqual(toReturn.description);
          expect(topic.user).toEqual(toReturn.user);
          expect(topic.posts).toEqual(toReturn.posts_count);
          const date = moment.utc(toReturn.date, 'YYYY-MM-DD HH:mm:ss');
          expect(topic.date.isSame(date)).toBe(true);
        });
      });
    });
  });

  describe('#find', () => {
    describe('when not found', () => {
      beforeEach(() => {
        const url = `${apiClient.host}/topics/1`;

        mockedAxios
          .onGet(url)
          .reply(404);
      });

      it('returns an error', () => {
        return repository.find(1).catch(({ response }) => {
          expect(response.status).toEqual(404);
        });
      });
    });

    describe('when found', () => {
      const toReturn = {
        id: 1234,
        title: 'A title',
        description: 'A description',
        date: '2017-04-01 14:20:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        posts: []
      }

      beforeEach(() => {
        mockedAxios
          .onGet(`${apiClient.host}/topics/1`)
          .reply(200, toReturn);
      });

      it('returns succeeds', () => {
        return repository.find(1).then(topic => {
          expect(topic.id).toEqual(toReturn.id);
          expect(topic.title).toEqual(toReturn.title);
          expect(topic.description).toEqual(toReturn.description);
          expect(topic.user).toEqual(toReturn.user);
          expect(topic.posts).toEqual(toReturn.posts);
          const date = moment.utc(toReturn.date, 'YYYY-MM-DD HH:mm:ss');
          expect(topic.date.isSame(date)).toBe(true);
        });
      });
    });
  });

  describe('#create', () => {
    describe('when validation fails', () => {
      const request = {
        title: '',
        description: ''
      };
      const toReturn = {
        errors: {
          title: ["can't be blank"],
          description: ["can't be blank"]
        }
      };

      beforeEach(() => {
        mockedAxios
          .onPost(`${apiClient.host}/topics`, { topic: request })
          .reply(422, toReturn);
      });

      it('returns an error', () => {
        return repository.create(request).catch(({ response }) => {
          expect(response.status).toEqual(422);
          expect(response.data).toEqual(toReturn);
        });
      });
    });

    describe('when succeeds', () => {
      const request = {
        title: 'A title',
        description: 'A description'
      };
      const toReturn = {
        id: 1234,
        title: 'A title',
        description: 'A description',
        date: '2017-12-30 11:00:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        posts: 0
      };

      beforeEach(() => {
        mockedAxios
          .onPost(`${apiClient.host}/topics`, { topic: request })
          .reply(201, toReturn);
      });

      it('returns the created topic', () => {
        return repository.create(request).then(topic => {
          expect(topic.id).toEqual(toReturn.id);
          expect(topic.title).toEqual(toReturn.title);
          expect(topic.description).toEqual(toReturn.description);
          expect(topic.user).toEqual(toReturn.user);
          expect(topic.posts).toEqual(toReturn.posts);
          const date = moment.utc(toReturn.date, 'YYYY-MM-DD HH:mm:ss');
          expect(topic.date.isSame(date)).toBe(true);
        });
      });
    });
  });

  describe('#update', () => {
    describe('when validation fails', () => {
      const request = {
        title: '',
        description: ''
      };
      const toReturn = {
        errors: {
          title: ["can't be blank"],
          description: ["can't be blank"]
        }
      };

      beforeEach(() => {
        mockedAxios
          .onPatch(`${apiClient.host}/topics/1`, { topic: request })
          .reply(422, toReturn);
      });

      it('returns an error', () => {
        return repository.update(1, request).catch(({ response }) => {
          expect(response.status).toEqual(422);
          expect(response.data).toEqual(toReturn);
        });
      });
    });

    describe('when succeeds', () => {
      const request = {
        title: 'A title',
        description: 'A description'
      };
      const toReturn = {
        id: 1,
        title: 'A title',
        description: 'A description',
        date: '2017-12-30 11:00:00',
        user: {
          id: 1,
          name: 'User',
          email: 'email@example.com'
        },
        posts: 0
      };

      beforeEach(() => {
        mockedAxios
          .onPatch(`${apiClient.host}/topics/1`, { topic: request })
          .reply(200, toReturn);
      });

      it('returns the created topic', () => {
        return repository.update(1, request).then(topic => {
          expect(topic.id).toEqual(toReturn.id);
          expect(topic.title).toEqual(toReturn.title);
          expect(topic.description).toEqual(toReturn.description);
          expect(topic.user).toEqual(toReturn.user);
          expect(topic.posts).toEqual(toReturn.posts);
          const date = moment.utc(toReturn.date, 'YYYY-MM-DD HH:mm:ss');
          expect(topic.date.isSame(date)).toBe(true);
        });
      });
    });
  });

  describe('#delete', () => {
    describe('when fails', () => {
      beforeEach(() => {
        const url = `${apiClient.host}/topics/1`;

        mockedAxios
          .onDelete(url)
          .reply(500);
      });

      it('returns an error', () => {
        return repository.delete(1).catch(({ response }) => {
          expect(response.status).toEqual(500);
        });
      });
    });

    describe('when deleted', () => {
      beforeEach(() => {
        mockedAxios
          .onDelete(`${apiClient.host}/topics/1`)
          .reply(204);
      });

      it('returns succeeds', () => {
        return repository.delete(1).then(response => {
          expect(response.status).toEqual(204);
        });
      });
    });
  });
});
