const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,  // Opción 1: Si solo quieres almacenar el nombre de la categoría
        required: true,
        enum: ['hamburgers', 'accompagnements', 'boissons', 'desserts'] // Opcional: Si tienes un conjunto predefinido de categorías
      }
 
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;