const MembSociete = require("../models/membSocieteModel");
const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { login: "", motDePasse: "" };

  // incorrect login
  if (err.message === "Login incorrect") {
    errors.login = "Ce login est pas incorrecte ";
  }

  // incorrect password
  if (err.message === "Mot de passe incorrect") {
    errors.motDePasse = "Ce mot de passe est incorrecte";
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.login = "ce login est déjà enregistré";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Token creation
 const maxAge = '36000s';
//const maxAge =5;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};


module.exports.signup_postMembS = async (req, res) => {
  const newMembSociete  = req.body;
  console.log(req.body);
  try {
    const membSociete = await MembSociete.create(newMembSociete);
    const token = createToken(membSociete._id);
    res.status(201).json({ membSociete: membSociete._id , token: token});

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_postMembS = async (req, res) => {
  const { login, motDePasse } = req.body;
  try {

    const membSociete = await MembSociete.login(login, motDePasse);
    const token = createToken(membSociete._id);

    res.status(200).json({ membSociete: membSociete._id, token,"msg":"succes" });
    
  } catch (err) {
    const errors = handleErrors(err);
    res.status(203).json({ errors });
  }
};

module.exports.signup_postClient = async (req, res) => {
  const newClient  = req.body;
  console.log(req.body);
  try {
    const client = await Client.create(newClient);
    const token = createToken(client._id);
    res.status(200).json({ client: client._id , token: token});

  } catch (err) {
    const errors = handleErrors(err);
    res.status(201).json({ errors });
  }
};

module.exports.login_postClient = async (req, res) => {
  const { login, motDePasse } = req.body;
  try {

    const client = await Client.login(login, motDePasse);
    const token = createToken(client._id);
    res.status(200).json({ client: client._id, token,"msg":"succes" });
    
  } catch (err) {
    const errors = handleErrors(err);
    res.status(203).json({ errors });
  }
};


module.exports.refleshToken = async (req, res) => {
  console.log(req.user.id);
  const token = createToken(req.user.id);
  res.json({token})
};