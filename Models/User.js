const mongoose = require("mongoose");

const UserSchema  = new mongoose.Schema({

    first_name : String ,
    last_name : String,
    email : String ,
    password : String


}) ;

//exporting UserSchema as mongoose model under the name User
module.exports =  mongoose.model('User' , UserSchema);
