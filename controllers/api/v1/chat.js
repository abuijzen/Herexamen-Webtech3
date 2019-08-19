const Message = require('../../../models/chat');
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

    /* body opvragen die je in postman opstuurt*/
    console.log(req.body);

    let message = new Message();
    message.text = req.body.text;
    message.user =req.body.user;
    message.completed =req.body.completed;
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