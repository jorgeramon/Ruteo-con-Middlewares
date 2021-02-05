const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = model('product', ProductSchema);