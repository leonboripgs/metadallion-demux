const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  username: { type: String , unique: true, required: true, dropDups: true },
  description: String,      // unique to companies
  email: { type: String , unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  facebookID: String,
  twitterID: String,
  instagramID: String,
  googleID: String,
  notifications: Boolean,
  offsetPercentage: Number,
  carbonOffset: Number,
  phoneLinked: String,
  points: Number,
  score: Number,            // unique to companies
  publicKey: { type: String , unique: true, required: true, dropDups: true },
  privateKey: { type: String , unique: true, required: true, dropDups: true },
});

let Companies = mongoose.model('company', CompanySchema);
module.exports = Companies;
