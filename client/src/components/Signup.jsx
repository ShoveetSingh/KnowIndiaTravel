import React from 'react'
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import '../index.css'
import {Dark} from './'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



const Signup = () => {

  const [clicked,setClicked]=useState(false);
  

  const [value,setValue] = useState('');  

  const [form,setForm] = useState({
    username:'',
    email:'',
    password:'',
    Pass:'',
    country:'',
    phone:'',
    image:null,
  })





  const handleChange=(e)=>{

   // e.preventDefault();

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
   form.phone=value;
   console.log(form);

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

  const handleImageChange=(e)=>{

   var file=e.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend=()=>{
   
  setForm((prev)=>({
    ...prev,
    image:reader.result
  })

  )}


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
        <br></br>
       
       <label>Country*:</label>
       <input
       required
       type="text"
       id="country" name="country"
       onChange={handleChange}
       />
       <br></br>

       <label>Contact*:</label>
       <PhoneInput
       required id="phone" name="phone"
       placeholder="Enter your phone number."
       value={value}
       onChange={setValue}
       />
       <br></br>
       

       <input type="file" id="image" name="image" onChange={handleImageChange}/>

        <input type="submit" value="Signup"/>
      </form>
  
      <ToastContainer/>
    
    </div>
  )
}

export default Signup