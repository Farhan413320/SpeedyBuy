const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter product Name']
    },
    description:{
        type:String,
        required:[true, 'Please Enter product Description']
    },
    price:{
        type:Number,
        required:[true, 'Please Enter product Price'],
        maxLength:[true, 'Price cannot exceed 8 characters']
    },
    rating:{
        type:String,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,'Please Enter Product Category'],
    },
    Stock:{
        type:Number,
        required:[true, 'Please Enter product Stock'],
        maxLength:[4, 'Stck cannot exceed 4 characters'],
        default:1
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
         
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Product", productSchema);