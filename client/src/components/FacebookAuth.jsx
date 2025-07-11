import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const url =import.meta.env.VITE_SUPABASE_URL
const key =import.meta.env.VITE_SUPABASE_KEY
const supabase=createClient(url,key)



const FacebookAuth = () => {

const nav=useNavigate();


const handleClick=async(e)=>{
    
e.preventDefault();

const {data,error} = await supabase.auth.signInWithOAuth({
    provider:'facebook'
   })  
   
   if(error)
    toast.success(error.message);

   if(data){
    //get user session 
    
    const {data:{user},error:user_error} = await supabase.auth.getUser();

    //using that get user email
     
    if(user){

   const email=user.email;

    //using email get the image 
     
     const { data:filePath, error:e } = await supabase
    .from("TRAVEL")
    .select("path")
    .eq("Email", email);

    const { data:dat } = supabase.storage.from('tourist-profile-pics')
                           .getPublicUrl(filePath[0].path) 

    //send that image to app./
    nav("/",{state:{name:dat.publicUrl}})
    }

   }

}



  return (

    <div>
        <form onSubmit={handleClick}>
            <input type="submit" value="Facebook"/>
        </form>
        <ToastContainer/>
    </div>

  )

}

export default FacebookAuth