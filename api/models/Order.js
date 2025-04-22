const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    
    productIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Products'  // Referencia a los platos de  order
    }],
    menuIds:[{
    type: Schema.Types.ObjectId,
      ref: 'Menus'  // Referencia a los menus 
    }],
    total:{
        type:Number,
        required:true
    },
    status: { type: String, enum: ['pending', 'preparing', 'completed', 'delivered', 'cancelled' ], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    deliveryTime: { type: Date, default: null  },
  }); 
  

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;