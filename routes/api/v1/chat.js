const express = require('express');
const router = express.Router();

//verwijst naar file met functies die moet worden aangeroepn
const chatController = require('../../../controllers/api/v1/chat')

/* /api/v1/chat */
const birthday = 2120;

//get wordt afgehandeld met getAll functie (in chatController)
router.get("/", chatController.getAll);

//post wordt afgehandeld met create functie (in chatController)
router.post("/",chatController.create);

module.exports = router;