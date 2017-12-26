export default class User {
  constructor(id, name, email, token) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
  }

  toJSON() {
    const data = {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.token
    };

    return JSON.stringify(data);
  }
}
