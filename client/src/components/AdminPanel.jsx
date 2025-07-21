import {React,useState,useEffect} from 'react'
import {  useLocation } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import AdminLogin from './AdminLogin';
import Signout from './Signout'
import { createClient } from '@supabase/supabase-js';

const AdminPanel = () => {

const location = useLocation();

const name = location.state?.name;

const [Users,SetUsers]=useState([]);

const [change,setchange]=useState(true);

const [Trips,setTrips] = useState([]);

const url=import.meta.env.VITE_SUPABASE_URL;

const key=import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(url,key);

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

const handleClick=(e)=>{
  e.preventDefault();
  setchange(!change);
  console.log(change);
}

const handleFetch=async(e)=>{

e.preventDefault();
const {data,error}=await supabase().from('TRIP').select('*');

if(data)
setTrips(data);
else
toast.success(error.message);
}

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
     {name && <button onClick={handleClick} value="Change">Change</button>}
     
      {name ? change?
      (
       
       <>
       <table style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
         <th style={{ border: '1px solid black', padding: '8px' }}>SL No.</th> 
        <th style={{ border: '1px solid black', padding: '8px' }}>User_id</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Contact</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Confirmation_Sent_At</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Confirmed_At</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Account_Created_At</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Last_Sign_In</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Password_Updated_At</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Email Verified</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Take Action</th>
        </tr>
        </thead>
        <tbody>
       {
        Users.map((User,index)=>{
          if(User.user_metadata.phone)
         return(
         <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>{index}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.email}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.user_metadata.phone}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.user_metadata.full_name}</td>
            {User.confirmation_sent_at?
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.confirmation_sent_at}</td >:<td style={{ border: '1px solid black', padding: '8px' }}>-</td>}
            {User.confirmed_at?
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.confirmed_at}</td>:<td style={{ border: '1px solid black', padding: '8px' }}>-</td>}
            {User.created_at?
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.created_at}</td>:<td style={{ border: '1px solid black', padding: '8px' }}>-</td>}
            {User.last_sign_in_at?
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.last_sign_in_at}</td>:<td style={{ border: '1px solid black', padding: '8px' }}>-</td>}
            {User.updated_at?
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.updated_at}</td>:<td style={{ border: '1px solid black', padding: '8px' }}>-</td>}
            <td style={{ border: '1px solid black', padding: '8px' }}>{User.user_metadata.email_verified?"true":"false"}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
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
       (<>
       {handleFetch}
      <table style={{ border: '1px solid black', padding: '8px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Sl No.</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>User_id</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Destination</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>phone</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Number of Travelers</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>travelDate</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Tour Type</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>message</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Booking Date</th>
          </tr>
        </thead>
        <tbody>
       {
        Trips.map((Trip,index)=>{
          return(
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>{index}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.User_id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.email}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.destination}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.name}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.phone}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.travelers}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.travelDate}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.type}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.message}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{Trip.created_at}</td>
          </tr>
          )
        })
       } 
        </tbody>
      </table>
       
       </>):
      (<><h1>Not authorised to view data</h1></>)}
             
      <ToastContainer/>
    </div>
  )
}

export default AdminPanel