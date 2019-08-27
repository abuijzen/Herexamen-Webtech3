const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//schema declareren
const User = new Schema({
    //extra veldje toevoegen
    birthday: {type:String, required:true}
});
User.plugin(passportLocalMongoose);

//user model exporteren
module.exports= mongoose.model('User', User);