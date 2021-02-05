const express = require('express');
const Router = express.Router();
const ProductModel = require('../schemas/product');

Router.get('/test', function (request, response) {
  response.send('Product: Esto es una prueba');
});

Router.post('/', function (request, response) {
  const { body } = request; // <-- Destructuring

  // const obj = { a: 0, b: 1, c: 2 }

  // const { a, b, c } = obj; 
  // const a = obj.a;
  // const b = obj.b;
  // const c = obj.c;

  new ProductModel(body).save()
    .then(function (document) {
      response.json({ data: document });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "PRODUCT_CREATION"
      });
    });
});

Router.get('/', function (request, response) {
  ProductModel.find()
    .then(function (documents) {
      response.json({ data: documents });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "PRODUCT_FETCH"
      });
    })
});

Router.get('/:id', function (request, response) {
  const { id } = request.params;

  ProductModel.findById(id)
    .then(function (document) {
      response.json({ data: document });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "PRODUCT_FETCH_BY_ID"
      });
    })
});

module.exports = Router;