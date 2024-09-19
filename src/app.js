const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config({ path: "../.env" });
const geoCode = require("./utils/geoCode");
const getData = require("./utils/getData");

const app = express();

//express config
const viewsPath = path.join(__dirname, "../views/templates");
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

// Set the view engine to Handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "kunal Pitale",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "kunal Pitale",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need Help?",
    meassage:
      "If you're looking for weather information, simply enter the city name in the search bar to get the latest forecast including temperature, precipitation chances, and more. Stay updated on the weather before heading out!",
    name: "kunal Pitale",
  });
});

app.get("/weather", async (req, res) => {
  const query = req.query.address;
  if (!query) {
    return res.send({
      error: "You must provide a valid address",
    });
  }

  geoCode(query, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    getData(latitude, longitude, location, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      // console.log(data);
      return res.send({
        title: data.title,
        summary: data.summary,
        report: data.report,
        location: location,
        address: query,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    Text: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    Text: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
