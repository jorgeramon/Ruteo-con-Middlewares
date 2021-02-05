/*
La manera chafa pero que funciona:

module.exports = function (app) {
  app.get('/hello', function (request, response) {
    response.send('hksdakasd');
  });
}
*/

const md5 = require('md5');
const UserModel = require('../schemas/user');
const SessionMiddleware = require('../middlewares/session');
const express = require('express');
const Router = express.Router(); // <-- Crea una instancia de un ruteador

Router.get('/test', function (request, response) {
  response.send('User: Esto es una prueba');
});

Router.post('/', function (request, response) {
  let { body } = request;
  body.password = md5(body.password);

  new UserModel(body).save()
    .then(function (document) {
      response.json({ data: document });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "USER_CREATION"
      });
    });
});

Router.get('/me/products', SessionMiddleware, function (request, response) {
  const { id } = request.user;

  UserModel.findById(id).populate("cart")
    .then(function (user) {
      response.json({ data: user.cart });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "USER_CART"
      });
    });
});

Router.put('/me/products', SessionMiddleware, function (request, response) {
  const { id } = request.user;
  const { productId } = request.body;

  UserModel.findByIdAndUpdate(id, { $push: { cart: productId } })
    .then(function () {
      response.json({
        data: { ok: true }
      });
    })
    .catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "CART_PUSH"
      });
    })
});

module.exports = Router;