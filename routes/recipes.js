const r = require('../lib/recipes.js');
const express = require('express');
const router = express.Router();
const verifyAuth = require('./middleware/verifyAuth.js');
const findOrCreateUser = require('./middleware/findOrCreateUser.js');

router.get("/recipes/:subcategoryId", r.list, function(req, res, next) {
  res.json({recipes: req.recipes, subcategory: req.subcategory});
});
router.get("/recipe/:id", r.get, function(req, res, next) {
  res.json(req.recipe);
});
router.post("/recipes/move", r.move, function(req, res, next) {
  res.json(204);
});
// router.delete("/subcategory/:subcategoryId", r.deleteSu, function(req, res, next) {
//   res.json(204);
// });

router.get("/search/:searchTerm", r.search, function(req, res, next) {
  res.json(req.recipes);
});

module.exports = router;