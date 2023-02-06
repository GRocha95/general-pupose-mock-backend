import express from "express";
import cors from "cors";
import dataCompanies from "./mocks/mock-company-data.json";
import dataRoles from "./mocks/mock-roles-data.json";

const app = express();
const port = process.env.PORT || 3399;

app.use(cors());
app.use(express.json());
const companies = dataCompanies.companies;
const roles = dataRoles.roles;

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

app.get("/companies/:id", (req, res) => {
  companies.forEach((companie) => {
    if (Number(req.params["id"]) == companie.id) {
      return res.status(200).json(companie);
    }
  });
  return res.status(204).json({ message: "Nenhum registro encontrado" });
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

app.get("/roles", (req, res) => {
  if (req.method === `GET`) {
    res.json(roles);
  }
});

app.get("/roles/:id", (req, res) => {
  roles.forEach((role) => {
    if (Number(req.params["id"]) == role.id) {
      return res.status(200).json(role);
    }
  });
  return res.status(204).json({ message: "Nenhum registro encontrado" });
});

app.post("/roles", (req, res) => {
  const reqRole = req.body;

  var highId = 0;
  roles.forEach((role) => {
    role.id > highId;
    highId = role.id;
  });
  highId += 1;

  reqRole.id = highId;
  console.log(req.body);
  roles.push(reqRole);
  return res.status(200).json(reqRole);
});

app.delete("/roles/:id", (req, res) => {
  var index = 0;
  roles.forEach((role) => {
    if (Number(req.params["id"]) == role.id) {
      roles.splice(index, 1);
      return res.status(200).json({ message: "Role has removed." });
    }
    index++;
  });
  return res.status(201).json({ message: "Role not found." });
});

app.put("/roles/:id", (req, res) => {
  var index = 0;
  var roleToModify = req.body;
  roles.forEach((role) => {
    if (Number(req.params["id"]) == role.id) {
      roleToModify.id = role.id;
      roles[index] = roleToModify;
      return res.status(200).json({ roleToModify });
    }
    index++;
  });
  return res.status(201).json({ message: "Role not found." });
});

app.listen(port, () => {
  console.info(`Running on port ${port}.`);
});

// Export the Express API
module.exports = app;
