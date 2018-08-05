const zipcodes = require('zipcodes');
const express = require('express');
const router = express.Router();

router.get("/zip/:zip", (req, res)=>{
  if(!req.params.zip) return res.status(400).json({message: 'no zip sent'});
  let zip = req.params.zip;

  let location = zipcodes.lookup(zip);
  if(!location){
    return res.status(404).json({message: 'invalid zip code'});
  }
  res.json(location);
});

module.exports = router;
