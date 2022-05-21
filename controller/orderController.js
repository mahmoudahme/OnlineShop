const OrderModleModle = require("../model/OrderModel");
const validatorResult = require("express-validator").validationResult;

let getOrder = (req , res )=>{
    OrderModleModle.getItemByUser(req.session.userId).then((item)=>{
        res.render("order" , {items : item , isUser : true , isAdmin : req.session.isAdmin ,pageTitle : "Orders"})
    }).catch((err)=>{
        console.log(err);
    })
}

let postOrder = (req , res )=>{
    if(validatorResult(req).isEmpty()){
        OrderModleModle.addOrder({
            productName : req.body.productName ,
            productAmount : req.body.productAmount ,
            productTotalPrice : req.body.productTotalPrice ,
            Address : req.body.address,
            userId : req.session.userId ,
            productId : req.body.productId ,
            timestamp : Date.now() 
        }).then(()=>{
            res.redirect("/order")
        }).catch((err)=>{
            console.log(err);
        })
    }else {
        req.flash('validationError' , validatorResult(req).array());
        res.redirect(req.body.redirectTo);
    }
}

let deleteitem =(req , res)=>{
    OrderModleModle.deleteItem(req.body.orderID).then(()=>{
        res.redirect("/order")
    }).catch((err)=>{
        console.log(err);
    })
}

let deletAll = (req, res)=>{
    OrderModleModle.deleteAll().then(()=>{
        res.redirect("/order")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = {postOrder , getOrder , deletAll , deleteitem } ;