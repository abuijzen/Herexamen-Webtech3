const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config =require('config');

//assyncroon functie, awaits worden als laatste uitgevoerd
const signup = async (req, res, next) => {

    console.log(req.body);
    
    let username = req.body.username;
    let password = req.body.password;
    let birthday = req.body.birthday;

    const user = new User({
        username: username,
        birthday:birthday
    });

    //wachtwoord + encryptie
    await user.setPassword(password);
    //user opslaan via mongoose
    await user.save().then(result =>{

        console.log(result);
        //token aanmaken
        let token = jwt.sign({
            uid:result._id,
            username: result.username,
            birthday:req.body.birthday
        }, config.get('jwt.secret'));

        res.json({
            "status":"succes",
            "data":{
                "token":token
            }
        })

    }).catch(error =>{
        res.json({
            "status":"error"
        })
    });
};

const login = async(req,res,next)=>{
    //wachten op user model
    //authenthenicate = vergelijking user en hash in mongoDB
    //input komt uit username + password
    const user = await User.authenticate()(req.body.username,req.body.password,req.body.birthday).then(result =>{
        
        if(!result.user){
            return res.json({
                "status": "failed",
                "message": "Something went wrong"
            })

        }

        let token = jwt.sign({
            uid:result.user._id,
            birthday:result.user.birthday
            //username: result.user.username
        }, config.get('jwt.secret'));
        
        return res.json({
            "status":"succes",
            "data":{
                "token":token,
                //"user":result.user.username
            }
        });
    }).catch(error =>{
res.json({
    "status":"error",
    "message":error
})
    });
};
    
    module.exports.signup = signup;
    module.exports.login = login;