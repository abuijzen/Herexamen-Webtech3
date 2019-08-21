const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {

    console.log(req.body);
    
    let username = req.body.username;
    let password = req.body.password;
    let birthday = req.body.birthday;

    const user = new User({
        username: username,
        birthday:birthday
    });

    await user.setPassword(password);
    await user.save().then(result =>{

        console.log(result);

        let token = jwt.sign({
            uid:result._id,
            username: result.username,
            birthday:req.body.birthday
        }, "myVerySecretWord");

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
        }, "myVerySecretWord");
        
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