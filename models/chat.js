/*data opslaan in een schema, daarmee kunnen documenten gemaakt worden */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*mogelijke veldjes in mongodb*/
const chatSchema = new Schema({
    "text": {
        type: String,required:true},
    "user":String,
    "birthday":String
});


const Message = mongoose.model('Message', chatSchema);

module.exports = Message;