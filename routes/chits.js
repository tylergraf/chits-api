const p = require('../lib/chits.js');
const express = require('express');
const router = express.Router();

router.get("/chits", p.all);
router.get("/chit/:chitId", p.get);
router.post("/chit", p.new);
router.put("/chit/:chitId", p.update);
router.delete("/chit/:chitId", p.delete);

module.exports = router;
