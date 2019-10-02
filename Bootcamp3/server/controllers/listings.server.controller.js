
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
 
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};


/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {

  /* Replace the listings's properties with the new properties found in req.body */
	var this_listing = req.listing;
	var new_listing = new Listing(req.body);
		console.log("======");
		console.log(this_listing);
		console.log("======");
		console.log(new_listing);
		console.log("======");

		if(req.results) {
				changes = {
						name: new_listing.name,
						code: new_listing.code,
						address: new_listing.address,
						coordinates: {
								latitude: req.results.lat,
								longitude: req.results.lng
						}
				}
		} else {
				changes = {
						name: new_listing.name,
						code: new_listing.code,
						address: new_listing.address
				}
		};
 
  /* Save the listing */
		Listing.findOneAndUpdate({_id: this_listing._id}, changes, {new: true}, function (err, resp) {
				if (err) {
						console.log(err)
						res.status(400).send(err);
				} else {
						res.json(resp);
						console.log(resp);
				}
		});
};


/* Delete a listing */
exports.delete = function(req, res) {
		var listing = req.listing;
		console.log("ASDF");
		console.log(listing);
		console.log("ASDF");
		Listing.findByIdAndRemove({_id: listing._id}, function (err) {
				if (err) {
						console.log(err);
						res.status(400).send(err);
				} else {
						res.status(200);
						res.end();
				};
		});
  /* Add your code to remove the listins */
};


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Add your code */
		Listing.find({}, null, {sort: {code: 1}}, function(err, listing) {
				if (err) {
						throw err;
						res.status(400).send(err);
				} else {
						res.json(listing);
						console.log(listing);
				}
		});
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
