/*data opslaan in een schema, daarmee kunnen documenten gemaakt worden */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*mogelijke veldjes in mongodb*/
const chatSchema = new Schema({
    text: String,
    user:String,
    completed:Boolean
})


const Message = mongoose.model('Chat', chatSchema);

const getAll = (req,res)=>{
    Message.find({"user":"Angelique"},(err,docs)=>{
        if(!err){
            res.json({
                "status":"succes",
                "data":{
                    "chat":docs
                }

            });
        }
    });
}




const create = (req,res)=>{

    let message = new Message();
    message.text = "Eerste message";
    message.user ="Angelique";
    message.completed =false;
    message.save((err,doc)=>{

        /*als er geen error is, wordt deze json terug gestuurd*/
        if(!err){
            res.json({
                "status": "succes",
                "data":{
                    "message":doc
                }
            });

        }
    })

    
}


module.exports.getAll = getAll;
module.exports.create = create;