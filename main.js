/**
 * project : miniExpress js ---> Routes , middleware , outSideRoutes
 * tech js: promise ()
 * tech nj : http  events
 */

const { log } = require("console");
const miniExpress = require("./framework/app");
const app = new miniExpress();

app.use((req, res, next) => {
  console.log("middleware funtion 1", req.url);
  next();
});

app.use((req, res, next) => {
  console.log("middleware funtion 2", req.method);
  next();
});

app.get("/home", (req, res) => {
  res.end("ami home route a achi");
});

app.get("/about", (req, res) => {
  res.end("ami about route a ");
});

app.get("/mern", (req, res) => {
  res.end("ami mern route a ");
});

app.ourListen(3000, () => {
  console.log(`Server Running on http://localhost:3000`);
});
