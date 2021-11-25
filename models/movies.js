const Joi = require('joi');
	const mongoose = require('mongoose');
	

	const movieSchema = new mongoose.Schema({
        title: String,
        year: Number,
        runtime:Number,
	   /* tags: [String] */
	})
	

	const Movie = mongoose.model('Movie', movieSchema);
	

	function validateMovie(movie) {
	    const schema = Joi.object({
	        title: String,
            year: Number,
            runtime:Number,
	        /*tags: Joi.array().items(Joi.string()) */
	    })
	    return schema.validate(movie);
	}
	

	exports.Movie = Movie;
	exports.validate = validateMovie;

