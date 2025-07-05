const { log } = require("console");
const http = require("http");

class App {
  constructor() {
    this.routes = [];
    this.middleware = [];
  }
  // use method
  use(middlewareFn) {
    this.middleware.push(middlewareFn);
  }
  //get
  get(path, handelerFn) {
    this.routes.push({ method: "GET", path, handelerFn: handelerFn });
  }
  //post
  post(path, handelerFn) {
    this.routes.push({ method: "POST", path, handelerFn });
  }

  executeMiddlware(req, res) {
    const dispatch = (i = 0) => {
      if (i >= this.middleware.length) return Promise.resolve();
      const singleMw = this.middleware[i];
      return new Promise((resolve, reject) => {
        singleMw(req, res, () => {
          resolve(dispatch(i + 1));
        });
      });
    };
    return dispatch(0);
  }

  ourListen(port, callback) {
    const server = http.createServer(async (req, res) => {
      //middleware
      await this.executeMiddlware(req, res);

      //   search path
      const searchRoutes = this.routes.find(
        (r) => r.method == req.method && r.path == req.url
      );
      if (searchRoutes) {
        searchRoutes.handelerFn(req, res);
      } else {
        res.writeHead(404, {
          "content-type": "plain/text",
        });
        res.end("Routes Not Found");
      }
    });
    server.listen(port, callback);
  }
}

module.exports = App;
