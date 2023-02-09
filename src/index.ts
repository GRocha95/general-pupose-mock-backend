import { User } from "./../../example/src/mocks/users";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import dataCompanies from "./mocks/mock-company-data.json";
import dataRoles from "./mocks/mock-roles-data.json";
import dataAddress from "./mocks/mock-address-data.json";
import dataContacts from "./mocks/mock-contacts-data.json";
import dataUsers from "./mocks/mock-users-data.json";
import dataDepartments from "./mocks/mock-department-data.json";

const app = express();
const port = process.env.PORT || 3399;

app.use(cors());
app.use(express.json());
const companies = dataCompanies;
const roles = dataRoles;
const addresses = dataAddress;
const contacts = dataContacts;
const users = dataUsers;
const departments = dataDepartments;

app.get("/", (req, res) => {
  if (req.method === `GET`) {
    res.send("API mock works!");
  }
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (!login || !password || login === "" || password === "") {
    return res.status(400).json({
      message: "login or password is missing.",
    });
  }

  var user: User | undefined;

  users.forEach((userItem: User) => {
    if (
      (userItem.userMail == login && userItem.userPassword == password) ||
      (userItem.userDocument == login && userItem.userPassword)
    ) {
      user = userItem;
    }
  });

  if (!user) {
    return res.status(401).json({
      message: "Credenciais incorretas.",
    });
  }

  const secret = "4883f4963c57c7ee87f0854c2965c7bc";
  const expiresIn = "1d";

  const token = jwt.sign({ id: "1", name: "Teste", email: "email" }, secret, {
    expiresIn,
  });

  return res.status(200).json({
    token: token,
    name: user.name,
    document: user.userDocument,
  });
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

app.get("/address", (req, res) => {
  if (req.method === `GET`) {
    res.json(addresses);
  }
});

app.get("/address/:id", (req, res) => {
  addresses.forEach((address) => {
    if (Number(req.params["id"]) == address.id) {
      return res.status(200).json(address);
    }
  });
  return res.status(204).json({ message: "Nenhum registro encontrado" });
});

app.post("/address", (req, res) => {
  const reqAddress = req.body;

  var highId = 0;
  addresses.forEach((address) => {
    address.id > highId;
    highId = address.id;
  });
  highId += 1;

  reqAddress.id = highId;
  console.log(req.body);
  addresses.push(reqAddress);
  return res.status(200).json(reqAddress);
});

app.delete("/address/:id", (req, res) => {
  var index = 0;
  addresses.forEach((address) => {
    if (Number(req.params["id"]) == address.id) {
      addresses.splice(index, 1);
      return res.status(200).json({ message: "Address has removed." });
    }
    index++;
  });
  return res.status(201).json({ message: "Address not found." });
});

app.put("/address/:id", (req, res) => {
  var index = 0;
  var addressToModify = req.body;
  addresses.forEach((address) => {
    if (Number(req.params["id"]) == address.id) {
      addressToModify.id = address.id;
      addresses[index] = addressToModify;
      return res.status(200).json({ addressToModify });
    }
    index++;
  });
  return res.status(201).json({ message: "Address not found." });
});

app.get("/contacts", (req, res) => {
  if (req.method === `GET`) {
    res.json(contacts);
  }
});

app.get("/contacts/:id", (req, res) => {
  contacts.forEach((contact) => {
    if (Number(req.params["id"]) == contact.id) {
      return res.status(200).json(contact);
    }
  });
  return res.status(204).json({ message: "Nenhum registro encontrado" });
});

app.post("/contacts", (req, res) => {
  const reqContacts = req.body;

  var highId = 0;
  contacts.forEach((contact) => {
    contact.id > highId;
    highId = contact.id;
  });
  highId += 1;

  reqContacts.id = highId;
  console.log(req.body);
  contacts.push(reqContacts);
  return res.status(200).json(reqContacts);
});

app.delete("/contacts/:id", (req, res) => {
  var index = 0;
  contacts.forEach((contact) => {
    if (Number(req.params["id"]) == contact.id) {
      contacts.splice(index, 1);
      return res.status(200).json({ message: "Contact has removed." });
    }
    index++;
  });
  return res.status(201).json({ message: "Contact not found." });
});

app.put("/contacts/:id", (req, res) => {
  var index = 0;
  var contactToModify = req.body;
  contacts.forEach((contact) => {
    if (Number(req.params["id"]) == contact.id) {
      contactToModify.id = contact.id;
      contacts[index] = contactToModify;
      return res.status(200).json({ contactToModify });
    }
    index++;
  });
  return res.status(201).json({ message: "Contact not found." });
});

app.get("/departments", (req, res) => {
  if (req.method === `GET`) {
    res.json(departments);
  }
});

app.get("/departments/:id", (req, res) => {
  departments.forEach((department) => {
    if (Number(req.params["id"]) == department.id) {
      return res.status(200).json(department);
    }
  });
  return res.status(204).json({ message: "Nenhum registro encontrado" });
});

app.post("/departments", (req, res) => {
  const reqDepartment = req.body;

  var highId = 0;
  departments.forEach((department) => {
    department.id > highId;
    highId = department.id;
  });
  highId += 1;

  reqDepartment.id = highId;
  console.log(req.body);
  departments.push(reqDepartment);
  return res.status(200).json(reqDepartment);
});

app.delete("/departments/:id", (req, res) => {
  var index = 0;
  departments.forEach((department) => {
    if (Number(req.params["id"]) == department.id) {
      departments.splice(index, 1);
      return res.status(200).json({ message: "Department has removed." });
    }
    index++;
  });
  return res.status(201).json({ message: "Department not found." });
});

app.put("/departments/:id", (req, res) => {
  var index = 0;
  var departmentToModify = req.body;
  departments.forEach((department) => {
    if (Number(req.params["id"]) == department.id) {
      departmentToModify.id = department.id;
      departments[index] = departmentToModify;
      return res.status(200).json({ departmentToModify });
    }
    index++;
  });
  return res.status(201).json({ message: "Department not found." });
});

app.listen(port, () => {
  console.info(`Running on port ${port}.`);
});

// Export the Express API
module.exports = app;
