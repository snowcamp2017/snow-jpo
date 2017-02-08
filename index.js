const express = require("express");
const bodyParser = require("body-parser");
const Promise = require('promise');
const fetch = require('node-fetch');

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

const Sensor = require('./Sensor').Sensor;

let sensor = new Sensor({
  id:`bob-sensor`,
  minValue:-10,
  maxValue:10,
  delay:1500
});
sensor.start("generateData");

app.get('/sensors/bob-sensor', (req, res) => {
  res.send(sensor.getData());
});


app.get('/hello/world', (req, res) => {
  res.send({
    message: "Hello World!",
    whoami: "Java-Processing Octopus"
  })
});
app.listen(port);
console.log(`World Web Application is started - listening on ${port}`);
