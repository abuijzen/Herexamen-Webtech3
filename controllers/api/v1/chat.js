/*data opslaan in een schema, daarmee kunnen documenten gemaakt worden */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*mogelijke veldjes in mongodb*/
const chatSchema = new Schema({
    text: {
        type: String,
        required:true}
        ,
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



/* next kan de volgende middleware functie aanspreken*/
const create = (req,res,next)=>{

    let message = new Message();
    message.text = "Eerste message";
    message.user ="Angelique";
    message.completed =false;
    message.save((err,doc)=>{
        if(err){
            /* express handeld te error verder af
            Anders komt er geen foutmelding indien nodig
            en blijft de applicatie vasthangen*/
            // ->  return next(err);

            /*als je niet wilt dat express de foutmelding geeft
            maar je zelf een duidelijke boodschap wilt typen,
            dan kan je een json object maken*/
            res.json({
                "status": "error",
                "message":"Could not save this message"
            });
        }
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