const express = require("express");
const morgan = require("morgan");
const PORT = 5000;
const app = express();
const Team = require("./database/team");



app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

app.get("/teams", async (req, res)=>{

    const allTeams = await Team.findAll();

    res.json(allTeams)
})

app.post("/teams", async (req, res)=>{
    const {name, country, teamSize} = req.body;

    await Team.create({name, country, teamSize});

    res.redirect("/teams");
})

app.get("/teams/add", (req, res)=>{
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>World Cup News</title>
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>World Cup News</header>
        <form method="post" action="/teams">
          <label for="name">Name</label>
          <input type="text" name="name" />
          <label for="country">Country</label>
          <input type="text" name="country" />
          <label for="teamSize">Size</label>
          <input type="text" name="teamSize" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </body>
    </html>`)
})

app.get("/teams/:id", async (req, res)=>{
    const id = req.params.id;
    const singleTeam = await Team.findOne({
        where: {id}
    });
    res.json(singleTeam)
})


app.delete("/teams/:id", async (req, res)=>{
    const id = req.params.id;
    await Team.destroy({where: {id}});

    res.redirect("/teams");
})

app.put("/teams/:id", async (req, res)=>{
    const id = req.params.id;
    const {name, country, teamSize} = req.body;
    
    await Team.update(
        {
          name,
          country,
          teamSize
        },
        {
          where: {id},
        }
      ).then(()=>{
        res.send("successfully updated");
      })
})



app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})