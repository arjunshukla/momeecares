/**
 * Created by arjunshukla on 10/8/16.
 */
var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Product = require('../models/product');

router.get('/:name', function (req, res, next) {
    async.waterfall([
        function(callback){
            Category.findOne({name: req.params.name}, function(err, category){
                if(err) return next(err);
                callback(null, category);
            });
        },
        function(category, callback){
            for(var i=0; i<30; i++){
                var product = new Product();
                product.category = category._id;
                product.name = faker.commerce.productName();
                product.price = faker.commerce.price();
                product.image = faker.image.image();

                product.save();
            }
        }
    ]);

    res.json({message : 'Success'});
});

router.post('/search', function (req, res, next) {
    console.log(req.body.search_term);
    Product.search({
        query_string: {query: req.body.search_term }
    }, function(err, results){
        if(err) return next(err);
        res.json(results);
    });
});

module.exports = router;