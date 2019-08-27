const Message = require('../../../models/chat');

const getAll = (req,res)=>{
    //res.redirect('/birthday');
    //res.send(req.params)
    //krijg alleen de messages van de gebruiker zelf
    
    Message.find({"birthday":req.user.birthday},(err,docs)=>{
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

    //let birthday = req.user.birthday;
    
    //nieuwe instantie van message item maken
    let message = new Message();

    //message bevat text, user, birthday gelinkt aan user
    //body is iets dat je zelf invult en meegeeft
    message.text = req.body.text;
    message.user = req.user.username;
    message.birthday = req.user.birthday;
    //message.birthdayCount = db.users.find({"birthday" : req.user.birthday}).count();
   
    //message opslaan -> error of doc wordt afgehandeld
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