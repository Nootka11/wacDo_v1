const mongoose = require('mongoose');
const { Schema } = mongoose;


const menuSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'  // Referencia a los platos que pertenecen a este menú
    }],
    imageUrl: {
      type: String,
      required: false
    },
    price:{
      type:Number,
      required:true
    },
    disponible: {
      type: Boolean,
      default: true
  }
  }, { timestamps: true }); 
  

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;