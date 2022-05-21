const mongoose = require("mongoose") ;
 const URL = "mongodb+srv://MahmoudAhmed:mahm1234@cluster0.qgzok.mongodb.net/onlineShop?retryWrites=true&w=majority";
// const URL = "mongodb://localhost:27017/onlineShop" ;

const  productsSchema = mongoose.Schema({
    name : String , 
    price : Number ,
    description : String , 
    category : String ,
    image : String 
}); 
const Product = mongoose.model("product" , productsSchema) ;


// all product 
exports.getAllProduct = ()=>{
    return new Promise ((resolve , reject) =>{
        mongoose.connect(URL).then(()=>{
            return Product.find({})
        }).then( product=>{
            mongoose.disconnect() ;
            resolve(product) ;
        }).catch(err => reject(err))  
    })
    
}

//product with category 

exports.getProductWithcategory = (category)=>{

    return new Promise ((resolve , reject) =>{
        mongoose.connect(URL).then(()=>{
            return Product.find({category : category})
        }).then( product=>{
            mongoose.disconnect() ;
            resolve(product) ;
        }).catch(err => reject(err))  
    })
    
}
exports.getProductByID = (id)=>{
    return new Promise ((resolve , reject) =>{
        mongoose.connect(URL).then(()=>{
            return Product.findById(id)
        }).then( product=>{
            mongoose.disconnect() ;
            resolve(product) ;
        }).catch(err => reject(err))  
    })
}

exports.addproduct = (data) =>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            let item = new Product(data);
            return item.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
} 
