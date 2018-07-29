const p = require('../lib/holes.js');
const express = require('express');
const router = express.Router();

router.get("/holes", p.all);
router.get("/hole/:holeId", p.get);
router.post("/hole", p.new);
router.put("/hole/:holeId", p.update);
router.delete("/hole/:holeId", p.delete);

module.exports = router;
