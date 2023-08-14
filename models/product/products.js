const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    sku: String,
    enTitle:String,
    description:String,
    fullDesc:String,
    
    config:String,
    uploadImage:String,
    imageUrl: {
        type:String
    },
    imgGallery:String,
    imgGalleryUrl:{
        type:String 
    },
    price:String,
    categories:String
})
module.exports = mongoose.model('product',ProductSchema);