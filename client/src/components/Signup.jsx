import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const Signup = () => {

  const [clicked,setClicked]=useState(false);
   const nav=useNavigate();
  const [form,setForm] = useState({
    email:'',
    password:'',
    Pass:''
  })



  const handleChange=(e)=>{
    e.preventDefault();
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

  //Some Bugs in here.
  const clickhandler=(e)=>{
   // e.preventDefault() 
    setClicked(!clicked);
  }

  const handleSubmit =(e)=>{
   e.preventDefault();
  fetch('http://localhost:8080/Signup',{
   method:"POST",
   headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(form)
})
.then((res) => res.json())
.then((result)=>{
  if(result){
    //toast.success("User Registered");
    nav('/');
    }
})
.catch((error)=>{
   toast.success("Password do not match");
  console.log("Error->  ",error);
})
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label >Email*: </label>
        <input 
          required  type='mail' id="email" placeholder='abc@gmail.com' name="email" onChange={handleChange}/>
        <label>Password*: </label>
        <input 
          required type={clicked?"text":"password"} id="password" placeholder="abc123" name="password" onChange={handleChange}/>
       <label>Re-Enter Password*: </label>
        <input required type={clicked?"text":"password"} id="Pass" name="Pass" onChange={handleChange}/>
        <input 
        type="checkbox" id="check" name="check" onClick={()=>clickhandler()}/>
        <label>Show password</label>
        <input type="submit"/>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup