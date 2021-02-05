const database = require('./database');
database();

const UserRoutes = require('./routes/user');
const ProductRoutes = require('./routes/product');
const AuthRoutes = require('./routes/auth');
const express = require('express');
app = express();

app.use(express.json());
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/auth', AuthRoutes);

app.get('/kill', function (request, response) {
  response.end();
  process.exit(0);
});

app.listen(8080, function () {
  console.log('> Servidor escuchando el puerto 8080');
});