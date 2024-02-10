const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');




//create product...
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    });
});

//get all products....
exports.getAllProducts =  catchAsyncErrors(async(req,res) =>{
    console.log("sjd")
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
   const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    });
}); 

//update products....

exports.updateProduct =  catchAsyncErrors(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return  res.status(500).json({
            success:false,
            message:'product not found'
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
     
    res.status(200).json({
        success:true,
        product
    });
});

//delete product....

exports.deleteProduct =  catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler('Product not found',404));
       
       //res.status(404).json({
       //     success:false,
       //     message:'product not found'
       // });
   }

    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:'product deleted successfully'
    });
});

//get single product details....

exports.getProductDetails =  catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
         return  next(new ErrorHandler('Product not found',404));
        
        //res.status(500).json({
        //     success:false,
        //     message:'product not found'
        // });
    }

    res.status(200).json({
        success:true,
        product
    });
});