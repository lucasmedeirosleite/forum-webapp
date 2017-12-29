import APIClient from '../../../lib/api_client';
import Post from '../models/post';

const RESOURCE = 'posts';

export default class PostsRepository {
  constructor(apiClient = new APIClient()) {
    this.apiClient = apiClient;
  }

  createFrom(topicId, postParams = {}) {
    const data = { post: postParams };
    return this.apiClient.post(`topics/${topicId}/${RESOURCE}`, data).then(({ data }) => {
      return new Post(data.id,
        data.description,
        data.date,
        data.user,
        data.topic_id);
    });
  }

  deleteFrom(topicId, postId) {
    return this.apiClient.delete(`topics/${topicId}/${RESOURCE}/${postId}`);
  }
}
