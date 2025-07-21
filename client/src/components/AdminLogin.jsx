import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';

const AdminLogin = () => {

const nav=useNavigate();

const [Form,setForm]=useState({
        admin_email:'',
        admin_password:'',
    })

const handleChange=(e)=>{

    e.preventDefault();
    setForm({...Form,[e.target.name]:e.target.value})

}


const handleSubmit=(e)=>{

    e.preventDefault();
        
    fetch('http://localhost:8080/AdminLogin',{
        method:"POST",
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify(Form)
    })
    .then((res)=>res.json())
    .then((result)=>{
    
     if(result.message=="Wrong credentials")
       toast.success(result.error);
     else if(Object.keys(result).length === 0)
      toast.success("Entry denied as admin!")
      else     
       nav("/AdminPanel",{state:{name:result.message}});

    })
    .catch((error)=>{
        toast.success(error);
        console.log(error);
    })
}


  return (
    <div>
     
     <form onSubmit={handleSubmit}>

        <label>Email:</label>
        <input 
        type="email" required 
        placeholder="abc@gmail.com" 
        name="admin_email" 
        id="admin_email"
        onChange={handleChange}
        />
        <br></br>

        <label>Password:</label>
        <input 
        type="password" required 
        name="admin_password"
         id="admin_password"
         onChange={handleChange}
        />
        <br></br>

        <input type="submit" value="Login"/>

     </form>
     <ToastContainer/>
    </div>
  )
}

export default AdminLogin