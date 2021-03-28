const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const membSocieteSchema = mongoose.Schema({
  
  nom : {
    type: String,
    required: true
  }, 
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
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
  role: {
    type: String,
    enum : ["Ad","Rc","Rt","In"],
    default:"In"
  }
});


// "HOOKS"
// fire a function before we save the user to DB
membSocieteSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

// static method to login user
membSocieteSchema.statics.login = async function (login, motDePasse) {
  const membSociete = await this.findOne({ login });
  if (membSociete) {
    const auth = await bcrypt.compare(motDePasse, membSociete.motDePasse);
    if (auth) {
      return membSociete;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Login incorrect");
};





const MembSociete = mongoose.model("MembSociete", membSocieteSchema);
module.exports = MembSociete;
