/*const { Router } = require('express'); */
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const validationMiddleware = require('../middleware/jwtvalidation');

const { Movie, validate } = require('../models/movies');



  router.post('/',validationMiddleware.validJWTNeeded ,async(req, res) => {

  /*  const newMovieId = movies.length; */
    const result = validate(req.body)
  
    if(result.error)
    {
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
  catch
  {
    res.status(500).json(result.error);
  }
  
    movies.push(movie);
  
    res.location(`/movies/${newMovieId}`)
      .status(201)
      .json(movie);
     
    console.log(`movie name is ${movie.name} number of movie(s) is ${movies.length}`);
  
  });

router.get('/',async(req, res) => {

  const { title, year_written, limit , pagenumber, pagesize } = req.query;

  let filter = {};

  if (title) {
    filter.title = { $regex: `${title}`, $options: 'i' }

  }
 
  const yearNumber = parseInt(year_written)

  if (!isNaN(yearNumber)) {
    Number.isInteger(year_written)
    filter.year_written = yearNumber

  }


 

  let pageSizeNumber = parseInt(pagesize);

  if (isNaN(pageSizeNumber)) {
    pageSizeNumber = 0
  }
  let pageNumberNumber = parseInt(pagenumber);

  if (isNaN(pageNumberNumber)) {
    pageNumberNumber = 1
  }

  let limitNumber = parseInt(limit)

  if (isNaN(limitNumber)){
    limitNumber = 0
  }

  console.table(filter);

    const movies = await Movie.
    find(filter).
    limit(limitNumber).
    sort({price : 1, year_written : -1})
    //select('price year_written')

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

  router.delete('/:id',validationMiddleware.validJWTNeeded,async(req, res) => {
    /*const id = req.params.id; */

    try {
      const movie = await Movie.findByIdAndDelete(req.params.id)
      res.send(movie)
    }
    catch {
      res.status(404).json(`movie with that ID ${req.params.id} was not found`);
    }

  })
  

    
    
    /*const movie = movies.find(b => b.movieId === parseInt(req.params.id))
  
    if (!movie) {
      res.status(404).json(`movie with that ID {id} was not found`);
      return;
    }
  
    const index = movies.indexOf(movie);
  
    movies.splice(index, 1);
    res.send(movie); */
  
  
  
  
  
  router.put('/:id',validationMiddleware.validJWTNeeded ,async(req, res) => {
  
   /* const id = req.params.id; */
  
  
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
    /*const movie = movies.find(b => b.movieId === parseInt(req.params.id))
  
    if (!movie) {
      res.status(404).json(`movie with that ID {req.params.id} was not found`);
      return;
    }
  
    console.log(`changing movie ${movie.name}`);
    movie.name = req.body.name;
    movie.quantity = req.body.quantity;
  
  
    
    res.send(movie); */
  
  })

  const credentials = require('../config')



let secret =  credentials.jwtsecretkey // 


  
  module.exports = router
  
  


/*
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const validationMiddleware = require('../middleware/jwtvalidation');

const { Movie, validate } = require('../models/movies');



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
    filter.title = { $regex: `${title}`, $options: 'i' };
   
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
    sort({runtime : 1, year : -1})
   

    res.json(movies);

})

router.get('/:id',validationMiddleware.validJWTNeeded, async (req, res) => {
  
  
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
  
  
  */

/*
  router.delete('/:id', validationMiddleware.validJWTNeeded, async (req, res) => {

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
  
  */