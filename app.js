const {createClient}  = require("@supabase/supabase-js");
const express = require("express");
const app = express();
const dotenv=require('dotenv')
dotenv.config
const path = require("path");
const bp = require('body-parser');
const cors=require('cors')

app.use(express.json()); 
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "dist")));





//connection with DataBase

const supabase = createClient(url,key);

//Home-route

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


//Signup-route

app.post("/Signup",async(req,res)=>{

const {email,password,Pass} = req.body;
if(password!=Pass)
  return res.send(769);

            const {data,error} = await supabase
                               .from("User")
                               .insert([{
                                UserName:email,
                                Password_1:password
                              }]).select()
            console.log(error);  
            res.send({user:email,p1:password,p2:Pass});
              });


//Login-route

app.post("/Login",(req,res)=>{
const {email,password}=req.body;

});




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));