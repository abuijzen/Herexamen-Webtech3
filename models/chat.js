/*data opslaan in een schema, daarmee kunnen documenten gemaakt worden */
const mongoose = require('mongoose');

//object schema gebruiken
const Schema = mongoose.Schema;

/*mogelijke veldjes in mongodb*/
const chatSchema = new Schema({
    "text": {
        type: String,required:true},
    "user":String,
    //"postdate":Date,
    "birthday":String

});

//klasse maken op mongoose met collection name: Message
//op basis van chatSchema
const Message = mongoose.model('Message', chatSchema);

module.exports = Message;