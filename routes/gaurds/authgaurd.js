let isAuth = (req , res , next)=>{
    if(req.session.userId){
        next()
    }else{
        res.redirect("/login")
    }
}
let isNotAuth = (req , res , next)=>{
    if(!req.session.userId){
        next()
    }else{
        res.redirect("/")
    }
}

module.exports = {isAuth , isNotAuth} ;