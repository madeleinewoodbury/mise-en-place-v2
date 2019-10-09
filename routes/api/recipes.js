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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newRecipe = new Recipe({
        ingredients: req.body.ingredients.split(',').map(item => item.trim()),
        instructions: req.body.instructions,
        description: req.body.description,
        name: req.body.name,
        author: user.name,
        avatar: user.avatar,
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

// @route   GET /api/recipes/me
// @desc    Get all of current user's recipes
// @acess   Private
router.get('/me', auth, async (req, res) => {
  let recipes = [];
  try {
    const result = await Recipe.find().sort({ date: -1 });
    if (!result) {
      return res.status(400).json({ msg: 'No recipes found' });
    }

    for (recipe of result) {
      if (recipe.user.toString() === req.user.id) {
        recipes.push(recipe);
      }
    }

    if (recipes.length === 0) {
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

// @route   PUT /api/recipes/like/:id
// @desc    Like a recipe
// @acess   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(400).json({ msg: 'Recipe not found' });
    }

    // Check id recipe has already been liked by user
    if (
      recipe.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Recipe has already been liked' });
    }

    // Add like to recipe
    recipe.likes.unshift({ user: req.user.id });
    await recipe.save();
    res.json(recipe.likes);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/recipes/unlike/:id
// @desc    Remove a like from a recipe
// @acess   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(400).json({ msg: 'Recipe not found' });
    }

    // Check id recipe has already been liked by user
    if (
      recipe.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Recipe has not yet been liked' });
    }

    // Get remove index
    const removeIndex = recipe.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // Remove like
    recipe.likes.splice(removeIndex, 1);
    await recipe.save();
    res.json(recipe.likes);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
