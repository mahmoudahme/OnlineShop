const router = require("express").Router();
let homeController  = require("../controller/homeController") ;
let autherGaurd = require("./gaurds/authgaurd");

router.get("/",homeController.getHome)

module.exports = router ;