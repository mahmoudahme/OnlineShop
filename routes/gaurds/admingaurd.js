let isAdmin = (req , res , next )=>{
    if(req.session.isAdmin) next()
    else res.redirect("/notAdmin");
}
module.exports = {isAdmin} ;