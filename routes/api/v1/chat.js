const express = require('express');
const router = express.Router();

/* /api/v1/chat */

router.get("/",(req,res)=>{
    res.json({
        "status":"succes",
        "data":{
            "chat":[]
        }
    });
});

router.post("/", (req,res)=>{
    res.json({
        "status": "succes",
        "data":{
            "message":{
                "text":"Learn Node js"}
        }
    });
});

module.exports = router;