/*data opslaan in een schema, daarmee kunnen documenten gemaakt worden */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*mogelijke veldjes in mongodb*/
const chatSchema = new Schema({
    "text": {
        type: String,required:true},
    "user":String,
    "completed":Boolean
})


const Message = mongoose.model('Chat', chatSchema);

module.exports = Message;