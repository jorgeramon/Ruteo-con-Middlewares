const jwt = require('jsonwebtoken');

module.exports = function (request, response, next) {
  const token = request.get('Authorization');

  try {
    const payload = jwt.verify(token, 'SSSSSHHHHHHHHHHHHHHHHHHHH');
    request.user = payload;
    next();
  } catch (e) {
    response.status(401).json({
      message: "No tienes los permisos para usar este recurso",
      code: "NOT_AUTHORIZED"
    });
  }
}