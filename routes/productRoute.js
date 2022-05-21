const router = require("express").Router(); 
const productControler = require("../controller/productController")

router.get("/product/:id" ,productControler.getProduct)
module.exports = router ;