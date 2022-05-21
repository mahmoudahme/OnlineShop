const router = require("express").Router();
const cardController = require("../controller/cardController") ;
const authGaurd = require("./gaurds/authgaurd");
const bodyParser = require("body-parser") ;
const check = require("express-validator").check;

router.get("/card", authGaurd.isAuth , cardController.getCard);

router.post("/card" , 
authGaurd.isAuth ,
bodyParser.urlencoded({extended : true}),
check("amount").not().isEmpty().withMessage("amount is required").isInt({min : 1 }).withMessage("amount is nust be greater than 0 ") ,
cardController.postCard);

router.post("/card/save" ,
authGaurd.isAuth ,
bodyParser.urlencoded({extended : true}),
check("amount").not().isEmpty().withMessage("amount is required").isInt({min : 1 }).withMessage("amount is nust be greater than 0 ") ,
cardController.postSave ) ;

router.post("/card/delete" ,
authGaurd.isAuth ,
bodyParser.urlencoded({extended : true}),
cardController.deleteIte
)

router.post("/card/deletAll" ,authGaurd.isAuth , bodyParser.urlencoded({extended : true}), cardController.deleteAllitems)

router.post("/order/order",  authGaurd.isAuth ,cardController.postOrder )
module.exports = router ;

