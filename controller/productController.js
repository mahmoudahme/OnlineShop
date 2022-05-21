const productsModel = require("../model/productModel");

let getProduct = (req , res )=>{
    let id = req.params.id ;
    productsModel.getProductByID(id).then(products =>{
        res.render("product" , {prodects : products , isUser : req.session.userId,valedationErr : req.flash("validationError")[0] , isAdmin :req.session.isAdmin , pageTitle : "product"})
    })
}

module.exports = { getProduct};  