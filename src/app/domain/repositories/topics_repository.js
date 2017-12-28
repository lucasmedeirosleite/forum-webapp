import APIClient from '../../../lib/api_client';
import Topic from '../models/topic';

const RESOURCE = 'topics'

export default class TopicsRepository {
  constructor(apiClient = new APIClient()) {
    this.apiClient = apiClient;
  }

  all(term = null) {
    return this.apiClient.get(RESOURCE, { term }).then(response => {
      return response.data.map(userData => {
        return new Topic(userData.id, userData.title, userData.description, userData.user_id);
      });
    });
  }
}
