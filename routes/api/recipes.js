const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   POST /api/recipes
// @desc    Create a recipe
// @acess   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Recipe name is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
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
        description: req.body.description,
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

// @route   GET /api/recipes
// @desc    Get all recipes
// @acess   Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ date: -1 });
    if (!recipes) {
      return res.status(400).json({ msg: 'No recipes found' });
    }

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by id
// @acess   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(400).json({ msg: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe
// @acess   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(400).json({ msg: 'Recipe not found' });
    }

    // Check user
    if (recipe.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }

    await recipe.remove();
    res.json({ msg: 'Recipe deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
