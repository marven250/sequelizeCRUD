const db = require("./database/db");
const Team = require("./database/team");

async function seed(){
    try{
        await db.sync({force: true})
        await db.close();
    }catch(err){
        console.error(err);
        await db.close()
    }
}


seed()