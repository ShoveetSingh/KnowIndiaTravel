import React from 'react';
import { Dark,Signout } from './components';
import { useLocation } from 'react-router-dom';



function App() {


const location = useLocation();
const url = location.state?.name;

  return (
      <div >
       {url?<img src={url} alt="image" height='400' width='400' />:"Hello Guest"}
        <Dark/>
        {url?<Signout/>:<a href="/Login">Login</a>}
        
       </div>
  )
}

export default App
