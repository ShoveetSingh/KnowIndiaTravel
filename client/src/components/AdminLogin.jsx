import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Admin = () => {

const nav=useNavigate();

const [Form,setForm]=useState({
        email:'',
        passsword:'',
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
       toast.success(result.message);
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
        name="email" 
        id="email"
        onChange={handleChange}
        />
        <br></br>

        <label>Password:</label>
        <input 
        type="password" required 
        name="password"
         id="password"
         onChange={handleChange}
        />
        <br></br>

        <input type="submit" value="Login"/>

     </form>
     
    </div>
  )
}

export default Admin