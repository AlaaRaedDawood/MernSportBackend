const mongoose = require("mongoose");

const EventSchema  = new mongoose.Schema({

    title : String ,
    description : String,
    price : Number ,
    sport : String ,
    // thumbnail : String ,
    date : Date ,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


} , {
    toJSON : {
        virtuals: true
    }
}
) ;

// EventSchema.virtual("thumbnail_url").get(function () { return `http://localhost:8000/files/${this.thumbnail}` })
//exporting UserSchema as mongoose model under the name User
module.exports =  mongoose.model('Event' , EventSchema);
