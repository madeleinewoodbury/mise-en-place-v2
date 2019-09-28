const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  favoriteFoods: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
