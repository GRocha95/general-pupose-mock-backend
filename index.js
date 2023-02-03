import data from "./mock-company-data.json";
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  if (req.method === `GET`) {
    res.send("Express on Vercel");
  }
});
app.get("/companies", (req, res) => {
  const companies = data.companies;
  if (req.method === `GET`) {
    res.json(companies);
  }
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
