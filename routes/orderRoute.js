const router = require("express").Router();
const orderController = require("../controller/orderController") ;
const authGaurd = require("./gaurds/authgaurd");
const bodyParser = require("body-parser") ;
const check = require("express-validator").check;

router.get("/order", authGaurd.isAuth , orderController.getOrder);

router.post("/order" , 
authGaurd.isAuth ,
bodyParser.urlencoded({extended : true}),
check("address").not().isEmpty().withMessage("Address is require") , 
orderController.postOrder);

router.post("/order/deletAll" ,authGaurd.isAuth , bodyParser.urlencoded({extended : true}), orderController.deletAll)

router.post("/order/delete" ,authGaurd.isAuth , bodyParser.urlencoded({extended : true}), orderController.deleteitem);

module.exports = router ;