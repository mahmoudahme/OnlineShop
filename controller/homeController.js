const productsModel = require("../model/productModel");

let getHome = (req , res ,next )=>{
    let category = req.query.category ; 
    let productPromise ; 
    if(category && category !== 'all') productPromise = productsModel.getProductWithcategory(category) ;
    else productPromise =  productsModel.getAllProduct() ;
       
    productPromise.then(products =>{
            res.render("index" , {prodects : products , isUser : req.session.userId  , valedationErr : req.flash("validationError")[0] , isAdmin :req.session.isAdmin , pageTitle : "Home"})
        })
    
}

module.exports = {getHome} ;