const cardModle = require("../model/cardModel");
const validatorResult = require("express-validator").validationResult;

let postCard = (req , res )=>{
    if(validatorResult(req).isEmpty()){
        cardModle.addNewItem({
            name : req.body.name ,
            price : req.body.price ,
            amount : req.body.amount ,
            userId : req.session.userId ,
            productId : req.body.productId ,
            timestamp : Date.now() 
        }).then(()=>{
            res.redirect("/card")
        }).catch((err)=>{
            console.log(err);
        })
    }else {
        req.flash('validationError' , validatorResult(req).array());
        res.redirect(req.body.redirectTo);
    }
}

let getCard = (req , res )=>{
    cardModle.getItemByUser(req.session.userId).then((item)=>{
        res.render("card" , {items : item , isUser : true , isAdmin :req.session.isAdmin , pageTitle : "card"})
    }).catch((err)=>{
        console.log(err);
    })
}

let postSave = (req , res)=>{
    if(validatorResult(req).isEmpty()){
        cardModle.editItem(req.body.cardId , {
            amount: req.body.amount ,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect("/card")
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        req.flash('validationError' , validatorResult(req).array());
        res.redirect("/card");
    }
}
let deleteIte = (req , res )=>{
    cardModle.deleteItem(req.body.cardId).then(()=>{
        res.redirect("/card")
    }).catch((err)=>{
        console.log(err);
    })
}

let deleteAllitems = (req, res)=>{
    cardModle.deleteAll().then(()=>{
        res.redirect("/card")
    }).catch((err)=>{
        console.log(err);
    })
}

let postOrder = (req , res )=>{
    res.render("Address" , {data : req.body , error :req.flash('autherError')[0] , isUser : true ,  isAdmin : req.session.isAdmin , pageTitle : "Addres"} )
}
module.exports = {postCard , getCard , postSave ,deleteIte , deleteAllitems , postOrder};