const express = require('express');
const router = express.Router();

const players = require('./players.js');
const chits = require('./chits.js');
const rounds = require('./rounds.js');
const holes = require('./holes.js');
const zip = require('./zip.js');

router.use(players);
router.use(chits);
router.use(rounds);
router.use(holes);
router.use(zip);

module.exports = router;
