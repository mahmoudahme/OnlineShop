const mongoose = require("mongoose");
const URL = "mongodb+srv://MahmoudAhmed:mahm1234@cluster0.qgzok.mongodb.net/onlineShop?retryWrites=true&w=majority";
// const URL = "mongodb://localhost:27017/onlineShop" ;

const OrderSchema = mongoose.Schema({
    productName : String ,
    productAmount : Number ,
    productTotalPrice : String ,
    Address : String ,
    userId : String ,
    productId : String ,
    timestamp : Number 
})

const Order = mongoose.model("Order" , OrderSchema);

let addOrder = (data)=>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(URL).then(()=>{
            let item = new Order(data);
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
let getItemByUser = (Id)=>{
        return new Promise((resolve , reject)=>{
            mongoose.connect(URL).then(()=>{
                return Order.find({userId : Id })
            }).then((items)=>{
                mongoose.disconnect();
                resolve(items);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err) ;
            })
        })
    
}

let deleteItem = (id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Order.deleteOne({_id :id})
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
            return Order.deleteMany();
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })
}

let getOrderByid = (Id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            return Order.find({userId : Id })
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err) ;
        })
    })

}
module.exports = {addOrder , getItemByUser , deleteAll , deleteItem , getOrderByid} ;