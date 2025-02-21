import React from 'react'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const nav=useNavigate();


  const [clicked,setClicked]=useState(false)

  const [form,setForm] = useState({
    email:'',password:''
  })

  const handleClick=(e)=>{
    e.preventDefault();
   setClicked(!clicked);
  }

  const handleChange=(e)=>{
    e.preventDefault()
    setForm({...form,[e.target.value]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch('https://localhost:8080/Login',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form)
    })
    .then((res)=>res.json())
    .then((result)=>{
      if(result)
        nav("/");
    })
    .catch((error)=>{
      toast.success("Wrong email or incorrect password!");
      console.log("Error-> ",error);
    })
    }
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <label>Reistered email: </label>
       <input required type="email" id="email" name="email" onChange={handleChange}/>
       <label>Your Password: </label>
       <input required type={clicked?"text":"password"} onChange={handleChange} id="password" name="password"/>
        <input type="checkbox" onClick={handleClick}/>
        <label>Show password</label>
       <input type="submit"/>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login