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



// V1 user schema:
// {
//   email: String,
//   password: String,
//   socialMedia1: Boolean,
//   socialMedia2: Boolean,
//   socialMedia3: Boolean,
//   profilePic: Boolean,
//   points: Number,
//   ringLevel: Number,
//   emblemLevel: String,
//   pubKey: String,
//   priKey: String,
//   rep: Number,
//   tribe: [String],
// }

// V2 user schema:
// {
//   name: String,
//   username: String,
//   email: String,
//   password: String,
//   socialMedia1: String,           // changed from Boolean
//   socialMedia2: String,           // changed from Boolean
//   socialMedia3: String,           // changed from Boolean
//   profilePic: String,             // changed from Boolean
//   points: Number,
//   emblemLevel: Number,            // changed from String
//   pubKey: String,
//   priKey: String,
//   rep: Number,
//   tribe: [ String ],              // SET LIMIT TO 150, can have up to 150 current members / pending invs
//   tribeFollowers: Number,         // number of tribal invitations accepted
//   lastActivity: Number,           // epoch time to track transaction activity
//   tempOuterRingTime: Number,      // epoch time to track temporary outer ring growth
//   outerRingClicks: Number,        // number of clicks made to grow outer ring
//   // the below may change later
//   highestPoints: Number,          // most amount of points earned
//   highestEmblemLevel: Number,     // highest emblem level reached
// }
