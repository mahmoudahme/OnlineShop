const router = require("express").Router();
const check = require("express-validator").check ;
const AdminController = require("../controller/AdminController");
const admingaurd = require("./gaurds/admingaurd");
const multer = require("multer")

router.get("/admin/add" , admingaurd.isAdmin ,AdminController.getAdd);
router.post("/admin/add" , admingaurd.isAdmin , multer({
    storage :multer.diskStorage({
        destination :(req ,res , cb)=>{
            cb(null , 'images')
        },
        filename :(req ,file , cb)=>{
            cb(null , Date.now() + "-" + file.originalname)
        }
    })
}).single('image'), check('image').custom((value , {req}) =>{
    if(req.file) return true 
    else throw 'image is require'
}) ,AdminController.postProduct)

router.get("/admin/manage", admingaurd.isAdmin ,AdminController.getOrdermanage) ;
router.post("/admin/manage" , admingaurd.isAdmin , AdminController.getOrders) 

module.exports = router ;
