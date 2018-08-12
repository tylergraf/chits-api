const Hole = require('../models/Holes.js');
const debug = require('debug')('lib:holes');

exports.new = function(req, res, next) {
  let newHole = new Hole(req.body);

  return newHole.save(_ => {
      res.json(newHole);
    })
    .catch(err => res.status(500).end());
}
exports.all = function(req, res, next) {

  Hole.find({})
    .then(holes=>{
      res.json(holes);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.update = function(req, res, next) {
  let holeId = req.params.holeId;
  if(!holeId){return next({code: 400, message: 'No hole id sent.'})}

  let hole = req.body;

  Hole.findOneAndUpdate({_id: holeId}, { $set: hole})
    .populate({ path: '_round', populate: {path: 'chits players'}})
    .populate({ path: 'chits._player chits._chit'})
    .then(savedHole=>{
      if(!savedHole){return res.status(404).end()}

      res.json(Object.assign(savedHole,hole));
    })
    .catch(err=>{
      res.status(500).end()
    });
}

exports.get = function(req, res, next) {

  let holeId = req.params.holeId;
  if(!holeId){return next({code: 400, message: 'No hole id sent.'})}

  Hole.findOne({_id: holeId})
    .lean()
    .populate({ path: '_round', populate: {path: 'chits players holes'}})
    .populate({ path: 'chits._player chits._chit'})
    .then(hole=>{
      if(!hole) return res.status(404).end();

      let playerCounts = hole._round.holes
        .map(hole=>hole.chits.map(chit=>chit._player))
        .filter(hole=>hole.length)
        .reduce((obj,hole)=>{
          hole.forEach(player=>{
            obj[player] = obj[player] || 0;
            obj[player]++;
          });
          return obj;
        },{});

      hole._round.players = hole._round.players.map(player=>{
        let count = playerCounts[player._id] || 0;
        player.total = count;
        return player;
      });
      res.json(hole);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.delete = function(req, res, next) {
  let holeId = req.params.holeId;
  if(!holeId){return next({code: 400, message: 'No hole id sent.'})}

  Hole.remove({_id: holeId})
    .then(_=>{
      res.status(204).end();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).end();
    });
}
