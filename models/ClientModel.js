const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = mongoose.Schema({
  
  raisonSociale : {
    type: String,
    required: true
  }, 
  adresse: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  fax: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }, 
  nRegistreCommerce: {
    type: String,
    required: true
  },
  codeTVA: {
    type: String,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  motDePasse: {
    type: String,
    required: true
  },
});


// "HOOKS"
// fire a function before we save the user to DB
clientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

// static method to login user
clientSchema.statics.login = async function (login, motDePasse) {
  const client = await this.findOne({ login });
  if (client) {
    const auth = await bcrypt.compare(motDePasse, client.motDePasse);
    if (auth) {
      return client;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Login incorrect");
};





const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
