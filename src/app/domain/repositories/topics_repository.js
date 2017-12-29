import APIClient from '../../../lib/api_client';
import Topic from '../models/topic';

const RESOURCE = 'topics';

export default class TopicsRepository {
  constructor(apiClient = new APIClient()) {
    this.apiClient = apiClient;
  }

  all(term = null) {
    return this.apiClient.get(RESOURCE, { term }).then(response => {
      return response.data.map(userData => {
        return new Topic(userData.id,
                         userData.title,
                         userData.description,
                         userData.date,
                         userData.user,
                         userData.posts_count);
      });
    });
  }

  find(id) {
    return this.apiClient.get(`${RESOURCE}/${id}`).then(({ data }) => {
      return new Topic(data.id, data.title, data.description, data.user_id);
    });
  }

  create(topicParams = {}) {
    const data = { topic: topicParams };
    return this.apiClient.post(RESOURCE, data).then(({ data }) => {
      return new Topic(data.id, data.title, data.description, data.user_id);
    });
  }

  update(id, topicParams = {}) {
    const data = { topic: topicParams }
    return this.apiClient.patch(`${RESOURCE}/${id}`, data).then(({data}) => {
      return new Topic(data.id, data.title, data.description, data.user_id);
    });
  }

  delete(topicId) {
    return this.apiClient.delete(`${RESOURCE}/${topicId}`);
  }
}
