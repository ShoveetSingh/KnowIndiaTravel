import {React,useState} from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Update = () => {

   const navigate=useNavigate(); 

   const[From,setForm]=useState({

     email:'',
     password:''
     
   })

   const[Click,setClick]=useState(false)

   const handleChange =(e)=>{
       
   

   }

   const handleSubmit=(e)=>{

     e.preventDefault();
     fetch('',{

     })

   }

  return (
    <div>

        <form onSubmit={handleSubmit}>

            <label>Email:</label>
            <br/>
         <input 
         type="email"
         placeholder="your registered email"
         id="email"
        onChange={handleChange}
         />
         <br/>

         <label>New password:</label>
         <br/>
         <input type="password"
         id="password"
         onChange={handleChange}
         />
        <br/>

        <input type='submit' value="Submit"/>


        </form>

    </div>
  )
}

export default Update