const Player = require('../models/Players.js');
const debug = require('debug')('lib:players');

exports.new = function(req, res, next) {
  if(!req.body.name){return next(res.status(400).json({message: 'No player sent.'}))}
  let newPlayer = new Player({name: req.body.name});

  return newPlayer.save(player => {
      res.json(newPlayer);
    })
    .catch(err => res.status(500).end());
}
exports.update = function(req, res, next) {
  let playerId = req.params.playerId;
  if(!playerId){return next({code: 400, message: 'No player id sent.'})}

  let player = req.body;

  Player.findOneAndUpdate({_id: playerId}, { $set: player})
    .then(savedPlayer=>{
      if(!savedPlayer){return res.status(404).end()}

      res.json(Object.assign(savedPlayer,player));
    })
    .catch(err=>{
      res.status(500).end()
    });
}

exports.get = function(req, res, next) {

  let playerId = req.params.playerId;
  if(!playerId){return next({code: 400, message: 'No player id sent.'})}

  Player.findOne({_id: playerId})
    .then(player=>{
      if(!player) return res.status(404).end();

      res.json(player);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.all = function(req, res, next) {

  Player.find({})
    .then(players=>{
      res.json(players);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.delete = function(req, res, next) {
  let playerId = req.params.playerId;
  if(!playerId){return next({code: 400, message: 'No player id sent.'})}

  Player.remove({_id: playerId})
    .then(_=>{
      res.status(204).end();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).end();
    });
}
