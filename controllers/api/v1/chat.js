const Message = require('../../../models/chat');

const getAll = (req,res)=>{
    //res.send(req.params)
    //krijg alleen de messages van de gebruiker zelf
    Message.find({"user":spam},(err,docs)=>{
        if(!err){
            res.json({
                "status":"succes",
                "data":{
                    "chat":docs,
                   // "user":docs
                }

            });
        }
    });
}



/* next kan de volgende middleware functie aanspreken*/
const create = (req,res,next)=>{

    /* body opvragen die je in postman opstuurt*/
    console.log(req.body);

    //let birthday = req.user.birthday;
    

    let message = new Message();
    message.text = req.body.text;
    message.user = req.user.username;
    message.birthday = req.user.birthday;
    console.log(req.user.birthday);
    //message.birthdayCount = db.users.find({"birthday" : req.user.birthday}).count();
   
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
                    "message":doc,
                }
            });

        }
    })

    
}


module.exports.getAll = getAll;
module.exports.create = create;