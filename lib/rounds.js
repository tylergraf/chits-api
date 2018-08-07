const Round = require('../models/Rounds.js');
const Hole = require('../models/Holes.js');
const debug = require('debug')('lib:rounds');


function createHolesForRound(roundId){
  let holes = Array.from(new Array(18)).map((num,i)=>{
    return {
      number: i+1,
      _round: roundId
    };
  });

  return Hole.insertMany(holes);
}
exports.new = function(req, res, next) {
  let newRound = new Round();

  createHolesForRound(newRound.id)
    .then(holes=>{
      newRound.holes = holes.map(hole=>hole.id);
      return newRound.save()
    })
    .then(round => {
      res.json(newRound);
    })
    .catch(err => res.status(500).end());
}
exports.update = function(req, res, next) {
  let roundId = req.params.roundId;
  if(!roundId){return next({code: 400, message: 'No round id sent.'})}

  let round = req.body;

  Round.findOneAndUpdate({_id: roundId}, { $set: round})
    .then(savedRound=>{
      if(!savedRound){return res.status(404).end()}

      return Round.findOne({_id: roundId}).populate({ path: 'chits players'})
    })
    .then(savedRound=>{
      if(!savedRound){return res.status(404).end()}

      res.json(savedRound);
    })
    .catch(err=>{
      res.status(500).end()
    });
}

exports.get = function(req, res, next) {

  let roundId = req.params.roundId;
  if(!roundId){return next({code: 400, message: 'No round id sent.'})}

  Round.findOne({_id: roundId})
    .populate({ path: 'chits players'})
    .then(round=>{
      if(!round) return res.status(404).end();

      res.json(round);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}

exports.all = function(req, res, next) {

  Round.find({})
    .populate({ path: 'chits players'})
    .then(rounds=>{
      res.json(rounds);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}

exports.delete = function(req, res, next) {
  let roundId = req.params.roundId;
  if(!roundId){return next({code: 400, message: 'No round id sent.'})}


  Hole.deleteMany({ _round: roundId })
    .then(_=>Round.remove({_id: roundId}))
    .then(_=>{
      res.status(204).end();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).end();
    });
}
