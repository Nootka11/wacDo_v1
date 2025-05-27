const mongoose = require('mongoose');
const { Schema } = mongoose;
const applyOrderHooks = require('./hooks/orderHooks');


const orderSchema = new Schema({
    
    productIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Products'  // Referencia a los platos de  order
    }],
    menuIds:[{
    type: Schema.Types.ObjectId,
      ref: 'Menus'  // Referencia a los menus 
    }],
    reference: {
      type: String,
    },
    total:{
        type:Number,
        required:true
    },
    status: { type: String, enum: ['pending', 'preparing', 'completed', 'delivered', 'cancelled' ], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    deliveryTime: { type: Date, default: null  },
  }); 

applyOrderHooks(orderSchema);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;