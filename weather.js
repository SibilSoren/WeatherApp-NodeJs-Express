const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is runnig on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.location;
  const appid = "44bf76ab8ce87ca0df758c3dfdfdef63";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=metric`;
  http.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const name = weatherData.name;
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(
        "<h1>The temp at " + name + " is " + temp + " and is " + desc + "</h1>"
      );
      res.write(`<img src=${imgUrl}></img>`);
      res.send();
    });
  });
});
