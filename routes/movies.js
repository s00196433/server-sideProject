/*const { Router } = require('express'); */
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const validationMiddleware = require('../middleware/jwtvalidation');

const { Movie, validate } = require('../models/movies');



 

  // ----------------------------------------------------

  router.post('/',async(req, res) => {

  
    let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  let movie = new Movie(req.body);

  try {

    movie = await movie.save();
    res.location(`/${movie._id}`)
      .status(201)
      .json(movie);
  }
  catch {
    res.status(500).json(result.error);
  }

  
  
  });

  //----------------------------------------------------

router.get('/',async(req, res) => {

  const { title, year, limit ,runtime } = req.query;

  let filter = {};

  if (title) {
    filter.title = { $regex: `${title}`, $options: 'i' }

  }
 
  const yearNumber = parseInt(year)

  if (!isNaN(yearNumber)) {
    Number.isInteger(year)
    filter.year = yearNumber

  }



  let limitNumber = parseInt(limit)

  if (isNaN(limitNumber)){
    limitNumber = 0
  }

  console.table(filter);

    const movies = await Movie.
    find(filter).
    limit(limitNumber).
    sort({runtime : 1, year : -1}).
    select('runtime year') 

    res.json(movies);

})

router.get('/:id', validationMiddleware.validJWTNeeded, async (req, res) => {
  
  
    try {
      const movie = await Movie.findById(req.params.id);
  
    if (movie) 
    {
      res.json(movie);
    }
    else 
    {
      res.status(404).json('Not found');
    }
  }
  catch 
  {
    res.status(404).json('Not found not valid ID');
  }
  
    res.json(movie);
  })
  
  
  


  router.delete('/:id', async (req, res) => {

    try {
      const movie = await Movie.findByIdAndDelete(req.params.id)
      res.send(movie)
    }
    catch {
      res.status(404).json(`movie with that ID ${req.params.id} was not found`);
    }
  
  })
  
  
  
  router.put('/:id',async(req, res) => {

    const result = validate(req.body)
  
    if (result.error)
    {
      res.status(400).json(result.error);
      return;
    }
    try
    {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (movie) {
      res.json(movie);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }
   
  
  })

  const credentials = require('../config')



let secret =  credentials.jwtsecretkey 


  
  module.exports = router
  
  