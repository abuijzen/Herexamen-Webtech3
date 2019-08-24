//import { PrimusError } from "primus/errors";
const Primus = require('primus');
//functie krijgt server binnen
let go = (server)=>{

    //server wordt opgestart, opties kan je gebruiken voor soort driver indien nodig
    let primus = new Primus(server, {/* options */});
    primus.on('connection',(spark)=>{
        console.log('Received spark');

        //als er data is, word er een functie uitgevoerd met die data
        spark.on('data',(data)=>{
            console.log(data);
            //schrijven naar al je sparks tegelijk ipv spark.write
            //alle geconnecteerde clienst krijgen info binnen
            primus.write(data);
        });
    });
}

module.exports.go = go;