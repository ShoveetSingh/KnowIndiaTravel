import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';


const url =import.meta.env.VITE_SUPABASE_URL
const key =import.meta.env.VITE_SUPABASE_KEY
const supabase=createClient(url,key)


const Signout = () => {


const nav=useNavigate();


const handleSubmit=async (e)=>{

 e.preventDefault(); 
const {error} = await supabase.auth.signOut();

if(error)
  toast.success("Sign out denied!Some error has occurred");
else
nav("/");
}


  return (
    <div>
    
      <form onSubmit={handleSubmit}>
        
      <input type="submit" value="Signout"/>

      </form>

    </div>
  )
}

export default Signout