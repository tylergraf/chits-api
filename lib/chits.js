const Chit = require('../models/Chits.js');
const debug = require('debug')('lib:chits');

exports.new = function(req, res, next) {
  if(!req.body.name){return next(res.status(400).json({message: 'No player sent.'}))}
  let newChit = new Chit({name: req.body.name});

  return newChit.save(player => {
      res.json(newChit);
    })
    .catch(err => res.status(500).end());
}
exports.all = function(req, res, next) {

  Chit.find({})
    .then(chits=>{
      res.json(chits);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.update = function(req, res, next) {
  let chitId = req.params.chitId;
  if(!chitId){return next({code: 400, message: 'No chit id sent.'})}

  let chit = req.body;

  Chit.findOneAndUpdate({_id: chitId}, { $set: chit})
    .then(savedChit=>{
      if(!savedChit){return res.status(404).end()}

      res.json(Object.assign(savedChit,chit));
    })
    .catch(err=>{
      res.status(500).end()
    });
}

exports.get = function(req, res, next) {

  let chitId = req.params.chitId;
  if(!chitId){return next({code: 400, message: 'No chit id sent.'})}

  Chit.findOne({_id: chitId})
    .then(chit=>{
      if(!chit) return res.status(404).end();

      res.json(chit);
    })
    .catch(err=>{
      console.log(err);
      res.status(404).end();
    });
}
exports.delete = function(req, res, next) {
  let chitId = req.params.chitId;
  if(!chitId){return next({code: 400, message: 'No chit id sent.'})}

  Chit.remove({_id: chitId})
    .then(_=>{
      res.status(204).end();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).end();
    });
}
