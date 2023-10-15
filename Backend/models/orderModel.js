const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, requirred: true },
    city: { type: String, requirred: true },
    state: { type: String, requirred: true },
    country: { type: String, requirred: true },
    pinCode: {
      type: Number,
      requirred: true,
    },
    phoneNo: {
      type: Number,
      requirred: true,
    },
  },
  orderItems:[
    {
        name:{ type: String, requirred: true },
        price:{ type: Number, requirred: true },
        quantity:{ type: Number, requirred: true },
        image:{ type: String, requirred: true },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            requirred:true,
        }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    requirred:true,
  },
  paymentInfo:{
    id:{
      type:String,
      requirred:true,
    },
    status:{
        type:String,
        requirred:true,
      },
  },
  paidAt:{
    type:Date,
    requirred:true,
  },
  itemsPrice:{
    type:Number,
    requirred:true,
    default:0
  },
   taxPrice:{
    type:Number,
    requirred:true,
    default:0
  },
  shippingPrice:{
    type:Number,
    requirred:true,
    default:0
  },
  totalPrice:{
    type:Number,
    requirred:true,
    default:0
  },
  orderStatus:{
    type:String,
    requirred:true,
    default:"processing"
  },
  deliveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

module.exports = mongoose.model("Order",orderSchema)