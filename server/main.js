// ESM syntax is supported.
export { startAPI }

import express from "express";
const app = express();

function startAPI() {
  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.listen(3000)
}
