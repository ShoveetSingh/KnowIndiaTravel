const {createClient}  = require("@supabase/supabase-js");
const express = require("express");
const app = express();
const dotenv=require('dotenv')
dotenv.config()
const path = require("path");
const bp = require('body-parser');
const cors=require('cors');

// const { status } = require("express/lib/response");
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
const usercountry=req.body.country;
const userphone=req.body.phone;


const {image}=req.body;

const base64data = image.replace(/^data:image\/\w+;base64,/, "");
const buffer = Buffer.from(base64data,"base64");

const fileExt = image.match(/^data:image\/(\w+);base64,/)[1];
 const fileName = `${Date.now()}.${fileExt}`;


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
                phone:userphone,
                first_name:username,
                country:usercountry,
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

            if(Object.keys(dat).length>0){
              console.log(dat);
              return res.send({message:"User already Exist.Please Login"});

            }
            else if (err){
              console.log(err);
            }
            else{
             
              const {data:idata,error:ierror} = await supabase
                                              .storage
                                              .from("tourist-profile-pics")
                                              .upload(fileName,buffer,{
                                                contentType:`image/${fileExt}`,
                                              });
              
            console.log(idata);
            console.log(ierror);

            if(ierror)
              res.send({message:ierror.message})
            
            const {data:newdata,error:newerror} = await supabase
                                                        .from("TRAVEL")
                                                        .insert([{
                                'UserName':username,
                                'Email':useremail,
                                'Country':usercountry,
                                'Phone number':userphone,
                                'path':fileName,
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
        }
               });

//Login-route
app.post('/Login',async(req,res)=>{

const email =  req.body.email;
const pass =  req.body.password;


  
  const {data,error} = await supabase.auth.signInWithPassword({

    email:email,
    password:pass

  })

if(error){
console.log(error);
return res.send({
  message:"User does not exist or password incorrect.",
  
})

}



if(data){
  
  const { data:filePath, error:e } = await supabase
    .from("TRAVEL")
    .select("path")
    .eq("Email", email);

  const { data:dat } = supabase.storage.from('tourist-profile-pics')
                       .getPublicUrl(filePath[0].path) 

return res.send({

  message:dat.publicUrl
})  

}


});


//Email confrimation Route
app.post('/Update',async(req,res)=>{

const user_email=req.body.email;

if(user_email){


const {data,error} = await supabase.auth.resetPasswordForEmail(
 user_email,
 { redirectTo:"http://localhost:5173/Password",
})

if(error){
  console.log(error);
res.send({message:error.message});
}
else
res.send({message:"Password reset link sent"});

}
else
console.log("NO email");

})

//Admin Login-route
app.post('/AdminLogin',async(req,res)=>{

 const {admin_email,admin_password}=req.body;

 const {data,error} = await supabase.auth.signInWithPassword({

    email:admin_email,
    password:admin_password

  })

if(error){
console.log(error);

return res.send({
  message:"Wrong credentials",  
})

}
if(data){

return res.send({
  message:data.user.email
})

}

})

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));