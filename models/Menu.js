const mongoose = require('mongoose');
const { Schema } = mongoose;


const menuSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'  // Referencia a los platos que pertenecen a este menú
    }],
    price:{
        type:Number,
        required:true
    }
  }); 
  

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;