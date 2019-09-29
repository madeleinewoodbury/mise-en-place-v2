const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @acess   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'name'
    );
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profile
// @desc    Get all user profiles
// @acess   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name');
    if (!profiles) {
      return res.status(400).json({ msg: 'No profiles found' });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile
// @desc    Create or update profile
// @acess   Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is required')
      .not()
      .isEmpty(),
    check('favoriteFoods', 'Favorite foods are required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      status,
      website,
      location,
      favoriteFoods,
      bio,
      youtube,
      facebook,
      twitter,
      instagram
    } = req.body;

    // Build profile fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (status) profileFields.status = status;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (favoriteFoods) {
      profileFields.favoriteFoods = favoriteFoods
        .split(',')
        .map(food => food.trim());
    }
    if (bio) profileFields.bio = bio;

    // Build social fields
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Updtae profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/profile
// @desc    Delete profile and user
// @acess   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User and profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
