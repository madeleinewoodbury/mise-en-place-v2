const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   GET /api/search/recipe
// @desc    Search for a recpie by name
// @acess   Private
router.get(
  '/recipe',
  [
    auth,
    check('search', 'Search field is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let searchValue = req.body.search;
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
  }
);

module.exports = router;
