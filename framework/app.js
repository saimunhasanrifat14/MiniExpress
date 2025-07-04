const http = require("http");

class App {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  //   use method to add middleware
  use(middleware) {
    this.middlewares.push(middleware);
  }
  get(path, handler) {
    this.routes.push({ path, method: "GET", handler });
  }
  post(path, handler) {
    this.routes.push({ path, method: "POST", handler });
  }
}

module.exports = App;
