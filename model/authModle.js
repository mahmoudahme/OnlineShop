const bcrypt = require("bcrypt") ; 
const mongoose  = require("mongoose") ;
 const URL = "mongodb+srv://MahmoudAhmed:mahm1234@cluster0.qgzok.mongodb.net/onlineShop?retryWrites=true&w=majority";
//const URL = "mongodb://localhost:27017/onlineShop" ;

const  userSchema = mongoose.Schema({
    username : String , 
    email : String , 
    password : String ,
    isAdmin :{
        type : Boolean ,
        default : false
    }
});

const User = mongoose.model("user" , userSchema) ;

exports.CreateNewUser = (username , email , password)=>{
    return new Promise((resolve , reject ) =>{
        mongoose.connect(URL).then(()=>{
            return User.findOne({email : email}) ;
        }).then(user =>{
            if(user){
                mongoose.disconnect();
                reject("email is used")
            }else{
                return bcrypt.hash(password , 10 )
            }
        }).then((hashpassword)=>{
            let user = new User({
                username : username ,
                email : email , 
                password : hashpassword 
            })
            return user.save(); 
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=> {
            mongoose.disconnect();
            reject(err)
        })
    })

}

exports.login = (email , password)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>
            User.findOne({email : email})).then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject("this email is not found");
            }else{
               bcrypt.compare(password , user.password).then((same)=>{
                    if(!same){
                        mongoose.disconnect();
                        reject("this password incorrect ") ;
                    }else{
                        mongoose.disconnect();
                        resolve({
                            id : user._id ,
                            isAdmin :user.isAdmin
                        });
                    }
                })
            }
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err)
        })
    })

}