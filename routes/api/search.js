const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   GET /api/search/recipe/:name
// @desc    Search for a recpie by name
// @acess   Private
router.get('/recipe/:name', auth, async (req, res) => {
  let searchValue = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find().sort({ date: -1 });
    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }
    for (recipe of result) {
      if (recipe.name.toUpperCase().includes(searchValue.toUpperCase())) {
        recipes.push(recipe);
      }
    }

    if (recipes.length === 0) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/search/recipe/me/:name
// @desc    Search current user's recpie by name
// @acess   Private
router.get('/recipe/me/:name', auth, async (req, res) => {
  let searchValue = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find().sort({ date: -1 });
    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }
    for (recipe of result) {
      if (recipe.name.toUpperCase().includes(searchValue.toUpperCase())) {
        // Check user
        if (recipe.user.toString() === req.user.id) {
          recipes.push(recipe);
        }
      }
    }

    if (recipes.length === 0) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/search/profile/:name
// @desc    Search for profile by users name
// @acess   Private
router.get('/profile/:name', auth, async (req, res) => {
  let searchValue = req.params.name;
  let profiles = [];

  try {
    const result = await Profile.find().populate('user', ['name', 'avatar']);
    if (!result) {
      res.status(400).json({ msg: 'No profiles found' });
    }
    for (profile of result) {
      if (profile.user.name.toUpperCase().includes(searchValue.toUpperCase())) {
        profiles.push(profile);
      }
    }

    if (profiles.length === 0) {
      res.status(400).json({ msg: 'No profiles found' });
    }

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
