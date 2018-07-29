const p = require('../lib/rounds.js');
const express = require('express');
const router = express.Router();

router.get("/rounds", p.all);
router.get("/round/:roundId", p.get);
router.post("/round", p.new);
router.put("/round/:roundId", p.update);
router.delete("/round/:roundId", p.delete);

module.exports = router;
