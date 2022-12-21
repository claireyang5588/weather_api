const express = require("express");
const app = express();
const ejs = require("ejs");
const { query } = require("express");
const bodyParser = require("body-parser");

const { CountQueuingStrategy } = require("node:stream/web");

let key = key;

//k to cel
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/response", (req, res) => {
  console.log(req.query);
  let { city } = req.query;
  let cityurl = "/" + city;
  console.log(cityurl);
  res.redirect(cityurl);
  //   res.send("ok");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  let d = await fetch(url);
  let dj = await d.json();
  let { temp } = dj.main;
  let newTemp = ktoC(temp);
  res.render("weather.ejs", { dj, newTemp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
