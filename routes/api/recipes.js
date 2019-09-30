const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   POST /api/recipes
// @desc    Create a recipe
// @acess   Public
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Recipe name is required')
        .not()
        .isEmpty(),
      check('ingredients', 'Ingredients are required')
        .not()
        .isEmpty(),
      check('instructions', 'Instructions are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newRecipe = new Recipe({
        ingredients: req.body.ingredients.split(',').map(item => item.trim()),
        instructions: req.body.instructions,
        name: req.body.name,
        author: user.name,
        user: req.user.id
      });

      const recipe = await newRecipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
