const  express = require("express");
const exphbs   = require("express-handlebars");
const app     = express();
const path   = require("path")
const db = require("./db/connection");
const bodyParser = require("body-parser");
const job = require("./models/Job");
const Squelize = require("sequelize");
const Op = Squelize.Op;
const port = 3000;

app.listen(port, function() {
    console.log(`O express está rodando na porta ${port}` );
});

// body parser 

app.use(bodyParser.urlencoded({extended: false})); 

// handlebars 
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars");

// static folder 
app.use(express.static(path.join(__dirname,"public")));
// db connection
db
   .authenticate()
   .then(() => {
    console.log("Banco de dados conectado");
   })
   .catch(err => {
       console.log("ocorreu um erro ao conectar ao banco de dados",err);
   });
// routes
app.get("/", (req,res) => {

    let search = req.query.job;
    let query = "%"+search+"%";
    if(!search){
        job.findAll({order: [
            ["createdAt", "DESC"]
        ]})
        .then(jobs => {
    
            res.render("index",{
                jobs
            });
        })
        .catch(err => console.log(err))
    }else {
        job.findAll({
            where:{title: {[Op.like]:query}},
            order: [
              ["createdAt", "DESC"]
        ]})
        .then(jobs => {
    
            res.render("index",{
                jobs, search
            });
        })
        .catch(err => console.log(err))
    }

   
    
});

// jobs routes

app.use("/jobs", require("./routes/jobs"));