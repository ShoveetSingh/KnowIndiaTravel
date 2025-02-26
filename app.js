const {createClient}  = require("@supabase/supabase-js");
const express = require("express");
const app = express();
const dotenv=require('dotenv')
dotenv.config()
const path = require("path");
const bp = require('body-parser');
const cors=require('cors');




app.use(express.json()); 
app.use(cors())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "dist")));



const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_KEY;

//connection with DataBase

const supabase = createClient(url,key);

//Home-route

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


//Signup-route

app.post("/Signup",async(req,res)=>{

const email=req.body.email
const password=req.body.password;
const pass=req.body.Pass;
           
            const {data,error} = await supabase
                                 .from("User")
                                 .select("*")
                                 .eq('UserName',email);

              //console.log(data);

              if(Object.keys(data).length>0)
          {
           return res.send({});
          }

          if(password!=pass)
          return res.send(769);


            const {data:dat,error:err} = await supabase
                               .from("User")
                               .insert([{
                                UserName:email,
                                Password_1:password
                              }]).select()
            console.log(err);  
            res.send({user:email,p1:password,p2:pass});
                            
              });


//Login-route

app.post('/Login',async(req,res)=>{

const email =  req.body.email;
const pass =  req.body.password;

  const {data,error} = await supabase
                                 .from("User")
                                 .select("*")
                                 .eq('UserName',email)
                                 .eq('Password_1',pass)

            console.log(data);                     

            if(Object.keys(data).length==0)
              return res.send(100);
            else
              return res.send({user:data,p1:pass});

});



const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));