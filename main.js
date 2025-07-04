const miniexpress = require("./framework/app");

const app = new miniexpress();

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.get("/hello", (req, res) => {
  res.end("Hello World");
});

app.post("/data", (req, res) => {
  res.end("Data received");
});
