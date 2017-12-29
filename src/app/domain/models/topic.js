import moment from 'moment';

export default class Topic {
  constructor(id, title, description, date, user, posts) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
    this.user = user;
    this.posts = posts;
  }
}
