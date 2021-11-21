const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    runtime:Number,
   /* nested: { categories : {}}, */

    tags: [String]

})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(Movie) {
    const schema = Joi.object({
        title: Joi.string().min(3),
        year: Joi.number().integer().min(1500),
      
        
        runtime: Joi.number(),
        tags: Joi.array().items(Joi.string())

    })
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;

