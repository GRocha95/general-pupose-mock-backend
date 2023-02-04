import express from "express";
import cors from "cors";
import data from "./mocks/mock-company-data.json";

const app = express();
const port = process.env.PORT || 3399;

app.use(cors());
app.use(express.json());
const companies = data.companies;

app.get("/", (req, res) => {
  if (req.method === `GET`) {
    res.send("API mock works!");
  }
});
app.get("/companies", (req, res) => {
  if (req.method === `GET`) {
    res.json(companies);
  }
});

app.post("/companies", (req, res) => {
  const reqCompany = req.body;

  var highId = 0;
  companies.forEach((companies) => {
    companies.id > highId;
    highId = companies.id;
  });
  highId += 1;

  reqCompany.id = highId;
  console.log(req.body);
  companies.push(reqCompany);
  return res.status(200).json(reqCompany);
});

app.delete("/companies/:id", (req, res) => {
  var index = 0;
  companies.forEach((company) => {
    if (Number(req.params["id"]) == company.id) {
      companies.splice(index, 1);
      return res.status(200).json({ message: "Company has removed." });
    }
    index++;
  });
  return res.status(201).json({ message: "Company not found." });
});

app.put("/companies/:id", (req, res) => {
  var index = 0;
  var companyToModify = req.body;
  companies.forEach((company) => {
    if (Number(req.params["id"]) == company.id) {
      companyToModify.id = company.id;
      companies[index] = companyToModify;
      return res.status(200).json({ companyToModify });
    }
    index++;
  });
  return res.status(201).json({ message: "Company not found." });
});

app.listen(port, () => {
  console.info(`Running on port ${port}.`);
});

// Export the Express API
module.exports = app;
