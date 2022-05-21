const authModel = require("../model/authModle") ;
const validationResult = require("express-validator").validationResult ;

let getSignup = (req , res)=>{
    res.render("signup" , {error :req.flash('autherError')[0] , validationErr : req.flash('validationError') ,isUser : false , isAdmin :false , pageTitle : "SignUp"})
}

let postSignup = (req , res)=>{
    if(validationResult(req).isEmpty()){
            authModel.CreateNewUser(req.body.username , req.body.email , req.body.password).then(()=> res.redirect("/login")).catch(err=> {
            req.flash('autherError' , err)
            res.redirect("/signup")
        })
    }else{
        req.flash('validationError' , validationResult(req).array());
        res.redirect("/signup")
    }
    
}

let getLogin = (req , res)=>{
    res.render("login" , {error :req.flash('autherError')[0] , isUser : false  , isAdmin :false , pageTitle : "Log In"});
}

let postLogin = (req , res)=>{
    authModel.login(req.body.email , req.body.password).then(result=>{
        req.session.userId = result.id ;
        req.session.isAdmin = result.isAdmin ;
        res.redirect("/")
    }).catch((err)=>{
        req.flash('autherError' , err)
        res.redirect("/login")
    })
} 
let logout =(req , res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
}

module.exports = {
    getLogin ,
    getSignup , 
    postSignup ,
    postLogin ,
    logout
}