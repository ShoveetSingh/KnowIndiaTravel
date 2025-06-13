import React from 'react'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import isEmpty from "lodash/isEmpty"



const Login = () => {

  const nav=useNavigate();

  const [clicked,setClicked]=useState(false)


  const [form,setForm] = useState({
    email:'',password:''
  })

  const handleClick=(e)=>{

   setClicked(!clicked);

  }

  const handleChange=(e)=>{

    e.preventDefault()

    setForm({...form,[e.target.name]:e.target.value})

  }

  const handleSubmit=(e)=>{

    e.preventDefault();

    fetch('http://localhost:8080/Login',{

      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form)

    })
    .then((res)=>res.json())
    .then((result)=>{
      if(result.message=='User does not exist or password incorrect.')
      toast.success(result.message);
      else
      nav("/",{state:{name:result.message}});
      
    })
    .catch((error)=>{
      console.log("Error-> ",error);
      toast.success("internal problem"); 
      toast.success("User  may have already logged in")
    })
    }
    

  return (

    <div>
      <form onSubmit={handleSubmit}>

       <label>Registered email: </label>
       <input 
       required 
       type="email" id="email"
        name="email" 
        onChange={handleChange}
        />
       
       <label>Your Password: </label>
       <input required
        type={clicked?"text":"password"} id="password"
         onChange={handleChange} 
          name="password"
          />
        
        <input 
        type="checkbox" 
        onClick={handleClick}
        />
        <label>Show password</label>
       
       <input type="submit"/>

      </form>
      
      <ToastContainer/>
    
    </div>

  )
}

export default Login