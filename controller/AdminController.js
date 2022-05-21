const productsModel = require("../model/productModel");
const validatorResult = require("express-validator").validationResult;
const OrderModel = require("../model/OrderModel")

let getAdd = (req , res) =>{
    res.render("addProduct" , 
    {error :req.flash('validationErrors'),
     isUser : true , 
     isAdmin :true ,
     pageTitle :'manageOrder'})
    
}

let postProduct =(req , res )=>{
    if(validatorResult(req).isEmpty()){
        productsModel.addproduct({
            name : req.body.name , 
            price : req.body.price ,
            description : req.body.description , 
            category : req.body.category ,
            image : req.file.originalname
        }).then(()=>{
            res.redirect("/")
        }).catch((err)=>{
            res.redirect("/error")
        })
    }else {
        req.flash('validationError' , validatorResult(req).array());
        res.redirect("/admin/add");
    }
}

let getOrdermanage = (req, res )=>{
    res.render("manageOrder" , { items : req.body , isUser : true , 
        isAdmin :true });
}

let getOrders = (req , res )=>{
    OrderModel.getOrderByid(req.body.id).then((item)=>{
        res.render("manageOrder" , {items : item , isUser : true , isAdmin :req.session.isAdmin ,pageTitle :'manageOrder'})
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = {getAdd , postProduct ,getOrdermanage , getOrders} ;