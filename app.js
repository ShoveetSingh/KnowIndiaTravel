const {createClient}  = require("@supabase/supabase-js");
const express = require("express");
const app = express();
const dotenv=require('dotenv')
dotenv.config()
const path = require("path");
const bp = require('body-parser');
const cors=require('cors');
const { status } = require("express/lib/response");


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

const username=req.body.username;  
const useremail=req.body.email
const userpassword=req.body.password;
const userpass=req.body.Pass;


if(userpassword!=userpass){

  return res.json({message:'password do not match'});

}
          
                         
const { data, error } = await supabase
  .from("TRAVEL")
  .select("*")
  .eq("UserName", username);



if(data && Object.keys(data).length>0){

return res.json({message:"UserName is already taken."})

}
                      

           //email authentication
          const {data:authdata,error:autherror} = await supabase.auth.signUp({
            
            email:useremail,
            password:userpassword,
            options:{
              data:{
                first_name:username,
              },
            }
          })

          if(autherror){

            console.log("Error during authentication!  ->  ",autherror);
            res.send({message:autherror.message})
          }

          else{

           console.log(authdata);
           //data insertion

           // write code to check whether the email already registered or not.
            const {data:dat,error:err} = await supabase
                                               .from("TRAVEL")
                                               .select("*")
                                               .eq("Email",useremail);

            if(dat){
              console.log(dat);
              return res.send({message:"User already Exist.Please Login"});

            }
            
            const {data:newdata,error:newerror} = await supabase
                                                        .from("TRAVEL")
                                                        .insert([{
                                'UserName':username,
                                'Email':useremail,
                                                         }]).select()

            if(newerror){        
            console.log("Error during insertion!  ->  ",newerror);
            res.send({message:newerror.message})
            }
            else
            {
              res.send({message:"Email sent"})
            };
               
          }

               });

//Login-route apply cookies as well.
app.post('/Login',async(req,res)=>{

const email =  req.body.email;
const pass =  req.body.password;


  

  const {data,error} = await supabase.auth.signInWithPassword({

    email:email,
    password:pass

  })



if(data){
  const name = data.user.user_metadata.first_name;
return res.send({
  message:name
})

}
if(error){
console.log(error);
return res.send({
  message:"User does not exist or password incorrect.",
  
})

}

});


//Password Update Route
app.get("/Update",async(req,res)=>{

const user_name=req.body.username;
const password=req.body.password;


if(password.toString().length<8){
 
res.json({
  message:'password too small must be greater than or equal to 8 characters'
})

}

const { data: users , error } = await supabase.auth.admin.listUsers({
  username:user_name
})

if(users)
  console.log(users);
else
console.log(error);

//var id=;

const {data,error:err} = await supabase.auth.admin.updateUserById(
  id,
{
    password:password
}
                               
)
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));