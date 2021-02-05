const { connect } = require('mongoose');

module.exports = function () {
  connect('mongodb+srv://root:root@bedu.qbbd7.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () {
      console.log('Conectado a la base de datos :)')
    })
    .catch(function () {
      console.error('No se puede establecer conexión con la BD');
      process.exit(1);
    });  
}