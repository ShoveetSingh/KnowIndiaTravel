import {React,useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js';
import { ToastContainer,toast } from 'react-toastify';

const url =import.meta.env.VITE_SUPABASE_URL
const key =import.meta.env.VITE_SUPABASE_SECRET_KEY
const supabase=createClient(url,key)

const AdminPanel = () => {

const location = useLocation();
const name = location.state?.name;
const [Users,SetUsers]=useState([]);

 const handleUser =async (e)=>{
     e.preventDefault();
     const { data:{users}, error } = await supabase.auth.admin.listUsers()
     if(users)
     SetUsers(users);
     else
     toast.success(error.message);
   }

  useEffect(()=>{
   if(name)
    handleUser();
  },[name])


  return (

    <div>
     {name?`Welcome ${name}`:"Hello Guest"}
    {name?
    <Signout/>
    :<AdminLogin/>
    }
     
      {name ? 
      (
       <>
       <table>
        <th></th>
       {
        Users.map((item)=>{
         
        })
    }
       </table>
       </>
      ):
        (<><h1>Not authorised to view data</h1></>)}

      <ToastContainer/>
    </div>
  )
}

export default AdminPanel