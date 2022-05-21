//requires
const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session) ;
const flash = require("connect-flash") ;



//require from midleWare
const homeRoute = require("./routes/homeRoute");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const cardRoute = require("./routes/cardRoute");
const OrderRoute = require("./routes/orderRoute");
const AdminRoute = require("./routes/adminRoute")
//require from midleWare
app.use(express.static(path.join(__dirname, "assats"))) ;
app.use(express.static(path.join(__dirname, "images"))) ;
app.use(flash())
//start session 
const Store = new SessionStore({
    uri :"mongodb://localhost:27017/onlineShop" ,
    collection : "Sessions" 
}) ;
app.use(session({
    secret :"this is the secret" ,
    saveUninitialized : false ,
    store : Store 
}))


app.set('view engine' , 'ejs') ;
app.set('views' , 'views') ;

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : false }));

app.use(homeRoute);
app.use(productRoute);
app.use(authRoute);
app.use(cardRoute);
app.use(OrderRoute);
app.use(AdminRoute);

app.get("/notAdmin" ,(req , res , next )=>{
    res.status(404);
    res.render("notAdmin.ejs" ,{ isUser : req.session.isUser , isAdmin :req.session.isAdmin ,pageTitle : 'not Admin'})
})
app.listen(1000 , console.log("server is running now on the port 1000"));