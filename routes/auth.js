const UserModel = require('../schemas/user');
const express = require('express');
const Router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

Router.post('/', function (request, response) {
  const { email, password } = request.body;

  UserModel.findOne({ email })
    .then(function (document) {
      if (!document) {
        response.status(401)
          .json({
            message: "No existe el correo electrónico",
            code: "AUTH_EMAIL_NOT_FOUND"
          });
      } else {
        const hash = md5(password);

        if (hash === document.password) {
          // El usuario existe entonces genero un token de JWT
          const token = jwt.sign({ id: document._id.toString() }, 'SSSSSHHHHHHHHHHHHHHHHHHHH');
          response.json({ data: { token }});
        } else {
          response.status(401).json({
            message: "La contraseña no coincide",
            code: "AUTH_PASSWORD"
          });
        }
      }
    })
    .catch(function (error) {
      response.status(401).json({
        message: error.message,
        code: "AUTH"
      })
    });
});

module.exports = Router;