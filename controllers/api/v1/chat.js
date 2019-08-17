const getAll = (req,res)=>{
    res.json({
        "status":"succes",
        "data":{
            "chat":[]
        }
    });
}

const create = (req,res)=>{
    res.json({
        "status": "succes",
        "data":{
            "message":{
                "text":"Learn Node js"}
        }
    });
}


module.exports.getAll = getAll;
module.exports.create = create;