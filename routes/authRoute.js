const router = require("express").Router();
const body_parser = require("body-parser") ;
const check = require("express-validator").check; 
const authController = require("../controller/authController");
const authgaurd = require("./gaurds/authgaurd")

router.get("/signup", authgaurd.isNotAuth, authController.getSignup)  ;
router.post("/signup" , authgaurd.isNotAuth,
body_parser.urlencoded({extended : true}),
check("username").not().isEmpty() ,
check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid format") ,
check("password").isLength({min : 6}) ,
authController.postSignup) ;
router.get("/login" ,authgaurd.isNotAuth , authController.getLogin);
router.post("/login" ,authgaurd.isNotAuth , body_parser.urlencoded({extended : true}) , authController.postLogin) ;
router.all("/logout" ,authgaurd.isAuth, authController.logout);

module.exports = router ; 