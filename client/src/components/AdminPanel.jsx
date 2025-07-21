import {React,useState,useEffect} from 'react'
import {  useLocation } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import AdminLogin from './AdminLogin';
import Signout from './Signout'

const AdminPanel = () => {

const location = useLocation();
const name = location.state?.name;
const [Users,SetUsers]=useState([]);

  useEffect(()=>{
   if(name){
      fetch('http://localhost:8080/UserList')
      .then((res)=>res.json())
      .then((result)=>{
        if(result.length>0)
       SetUsers(result);
       else
       toast.success("Could not load table");
      })
      .catch((error)=>{
        toast.success("Internal error");
      })
   }
  },[name])


const handleSubmit= (e)=>{

e.preventDefault();

const form = {
    id:e.target.identity.value,
    email:e.target.email.value,
};

fetch('http://localhost:8080/DeleteUser',{

method:"POST",
headers:{
    "Content-Type":'application/json'
},
body:JSON.stringify(form)
})
.then((res)=>res.json())
.then((result)=>{

    toast.success(result.message);
    if(result.message=="User deleted Successfully")
    setTimeout(window.location.reload(),10000);

})
.catch((error)=>{
    toast.success("Internal error")
})

}


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
        <thead>
        <tr>
        <th>User_id</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Name</th>
        <th>Confirmation_Sent_At</th>
        <th>Confirmed_At</th>
        <th>Account_Created_At</th>
        <th>Last_Sign_In</th>
        <th>Password_Updated_At</th>
        <th>Email Verified</th>
        <th>Take Action</th>
        </tr>
        </thead>
        <tbody>
       {
        Users.map((User,index)=>{
          if(User.user_metadata.phone)
         return(
         <tr>
            <td>{User.id}</td>
            <td>{User.email}</td>
            <td>{User.user_metadata.phone}</td>
            <td>{User.user_metadata.full_name}</td>
            {User.confirmation_sent_at?
            <td>{User.confirmation_sent_at}</td>:<td>-</td>}
            {User.confirmed_at?
            <td>{User.confirmed_at}</td>:<td>-</td>}
            {User.created_at?
            <td>{User.created_at}</td>:<td>-</td>}
            {User.last_sign_in_at?
            <td>{User.last_sign_in_at}</td>:<td>-</td>}
            {User.updated_at?
            <td>{User.updated_at}</td>:<td>-</td>}
            <td>{User.user_metadata.email_verified?"true":"false"}</td>
            <td>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="identity" value={User.id}/>
                    <input type="hidden" name="email" value={User.email}/>
                  <input type="submit" value="Delete"/>
                </form>
            </td>
         </tr>
         )
        })
      }
    
      </tbody>
       </table>
       </>
      ):
        (<><h1>Not authorised to view data</h1></>)}
         
      <ToastContainer/>
    </div>
  )
}

export default AdminPanel