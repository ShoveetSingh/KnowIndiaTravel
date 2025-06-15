import React from 'react';
import { Dark,Signout } from './components';
import { useLocation } from 'react-router-dom';



function App() {


const location = useLocation();
const name = location.state?.name;

  return (
      <div >
       <h1>Its working fine {name}</h1> 
        <Dark/>
        {name?<Signout/>:<a href="/Login">Login</a>}
        
       </div>
  )
}

export default App
