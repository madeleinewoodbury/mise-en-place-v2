const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   GET /api/search/recipe/:category/:name
// @desc    Search for a recpie by name
// @acess   Private
router.get('/recipe/:category/:name', auth, async (req, res) => {
  let searchCategory = req.params.category;
  let searchName = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);
    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    for (recipe of result) {
      if (searchCategory !== '0') {
        if (
          recipe.category === searchCategory &&
          recipe.name.toUpperCase().includes(searchName.toUpperCase())
        ) {
          recipes.push(recipe);
        }
      } else {
        if (recipe.name.toUpperCase().includes(searchName.toUpperCase())) {
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

// @route   GET /api/search/category/:name
// @desc    Search for a recipes by category
// @acess   Private
router.get('/category/:name', auth, async (req, res) => {
  let searchValue = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);
    if (!result) {
      res.status(404).json({ msg: 'No recipes found' });
    }

    if (searchValue === '0') {
      recipes = result;
    } else {
      for (recipe of result) {
        if (recipe.category === searchValue) {
          recipes.push(recipe);
        }
      }
    }

    if (recipes.length === 0) {
      res.status(404).json({ msg: 'No recipes found' });
    }

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/search/star/:category/:name
// @desc    Search for starred recpie by name
// @acess   Private
router.get('/star/:category/:name', auth, async (req, res) => {
  let searchCategory = req.params.category;
  let searchName = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);

    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    for (recipe of result) {
      if (searchCategory !== '0') {
        if (
          recipe.category === searchCategory &&
          recipe.name.toUpperCase().includes(searchName.toUpperCase()) &&
          recipe.starred.includes(req.user.id)
        ) {
          recipes.push(recipe);
        }
      } else {
        if (
          recipe.name.toUpperCase().includes(searchName.toUpperCase()) &&
          recipe.starred.includes(req.user.id)
        ) {
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

// @route   GET /api/search/star/:category
// @desc    Search for starred recpie by category
// @acess   Private
router.get('/star/:category', auth, async (req, res) => {
  let searchValue = req.params.category;
  let recipes = [];

  console.log(searchValue);

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);

    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }
    for (recipe of result) {
      if (searchValue !== '0') {
        if (
          recipe.category === searchValue &&
          recipe.starred.includes(req.user.id)
        ) {
          recipes.push(recipe);
        }
      } else {
        if (recipe.starred.includes(req.user.id)) {
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

// @route   GET /api/search/recipe/me/:category/:name
// @desc    Search current user's recpie by name
// @acess   Private
router.get('/recipe/me/:category/:name', auth, async (req, res) => {
  let searchCategory = req.params.category;
  let searchName = req.params.name;
  let recipes = [];

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);
    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    for (recipe of result) {
      if (recipe.user._id.toString() === req.user.id) {
        if (searchCategory !== '0') {
          if (
            recipe.category === searchCategory &&
            recipe.name.toUpperCase().includes(searchName.toUpperCase())
          ) {
            recipes.push(recipe);
          }
        } else {
          if (recipe.name.toUpperCase().includes(searchName.toUpperCase())) {
            recipes.push(recipe);
          }
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

// @route   GET /api/search/category/me/:category
// @desc    Search current user's recpie by category
// @acess   Private
router.get('/category/me/:category', auth, async (req, res) => {
  let searchCategory = req.params.category;
  let recipes = [];

  try {
    const result = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);
    if (!result) {
      res.status(400).json({ msg: 'No recipes found' });
    }

    for (recipe of result) {
      if (recipe.user._id.toString() === req.user.id) {
        if (searchCategory === '0') {
          recipes.push(recipe);
        } else {
          if (recipe.category === searchCategory) {
            recipes.push(recipe);
          }
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
