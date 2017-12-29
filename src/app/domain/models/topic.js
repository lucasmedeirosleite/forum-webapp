export default class Topic {
  constructor(id, title, description, date, user, posts) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.user = user;
    this.posts = posts;
  }
}
