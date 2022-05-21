const mongoose = require("mongoose") ;
 const URL = "mongodb+srv://MahmoudAhmed:mahm1234@cluster0.qgzok.mongodb.net/onlineShop?retryWrites=true&w=majority";
//const URL = "mongodb://localhost:27017/onlineShop" ;

const cardSchema = mongoose.Schema({
    name : String ,
    price : Number ,
    amount : Number ,
    userId : String ,
    productId : String ,
    timestamp : Number 
}); 

const Cart = mongoose.model("Cart", cardSchema);

let addNewItem = (data)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            let item = new Cart(data);
            return item.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}

let getItemByUser = (Id) =>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Cart.find({userId : Id } , {} , {sort :{timestamp :1}})
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}

let editItem = (Id , newData) =>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Cart.updateOne({_id: Id} , newData);
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}

let deleteItem =(Id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Cart.deleteOne({_id : Id})
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}
let deleteAll =()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Cart.deleteMany();
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}

module.exports = {addNewItem , getItemByUser ,editItem ,deleteItem , deleteAll}  ;