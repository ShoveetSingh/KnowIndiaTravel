import React from 'react'
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import '../index.css'
import {Dark} from './'

const Signup = () => {

  const [clicked,setClicked]=useState(false);
  
  

  const [form,setForm] = useState({
    username:'',
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

  //Bugs Fixed.
  const clickhandler=(e)=>{ 
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

toast.success(result.message);  

})
.catch((error)=>{

   toast.success("Internal Error");

  console.log("Error->  ",error);

})

  }


  return (
    
    <div>
      <Dark/>
      <form onSubmit={handleSubmit}>

       <label>UserName*:</label>
       <input
       required
       type='text' id='username'
       placeholder="bob"
       name='username'
       onChange={handleChange}
       ></input>

        <label >Email*: </label>
        <input 
          required  
          type='mail' id="email" 
          placeholder='abc@gmail.com' 
          name="email" 
          onChange={handleChange}
          />
       
        <label>Password*: </label>
        <input 
          required 
          type={clicked?"text":"password"} 
          id="password" placeholder="abc123"
           name="password"
           onChange={handleChange}
           />
       
       <label>Re-Enter Password*: </label>
        <input required 
        type={clicked?"text":"password"} 
        id="Pass" name="Pass" 
        onChange={handleChange}
        />
       
        <input 
        type="checkbox" 
        id="check" name="check" 
        onClick={()=>clickhandler()}
        />
        <label>Show password</label>
       
        <input type="submit"/>
      </form>
  
      <ToastContainer/>
    
    </div>
  )
}

export default Signup