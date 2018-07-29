const p = require('../lib/players.js');
const express = require('express');
const router = express.Router();

router.get("/players", p.all);
router.get("/player/:playerId", p.get);
router.post("/player", p.new);
router.put("/player/:playerId", p.update);
router.delete("/player/:playerId", p.delete);

module.exports = router;
