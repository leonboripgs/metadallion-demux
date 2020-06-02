const mongoose = require('mongoose');
const { Schema } = mongoose;
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const MetaUserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String , unique: true, required: true, dropDups: true },
  email: { type: String , unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  userType: { type: Number, default: 0},  // 0: normal user, 1: influencer, 2: company user
  description: {type: String, default: ''},
  avatar: { type: String, default: ''},
  facebookID: { type: String },
  twitterID: { type: String },
  instagramID: { type: String },
  googleID: { type: String },
  notifications: { type: Boolean },
  offsetPercentage: { type: Number },
  carbonOffset: { type: Number },
  points: { type: Number },
  publicKey: { type: String , unique: true, required: true, dropDups: true },
  privateKey: { type: String , unique: true, required: true, dropDups: true },
  createdAt: { type: Date, default: Date.now()}
});
MetaUserSchema.plugin(autoIncrement.plugin, 'data_metausers');

module.exports = mongoose.model('data_metausers', MetaUserSchema);