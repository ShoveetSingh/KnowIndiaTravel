import React from 'react';
//import useDarkMode from 'use-dark-mode'
import './App.css'
import { useEffect } from 'react';
import { Dark } from './components';

import { useLocation } from 'react-router-dom';

function App() {

  // const DarkMode =useDarkMode(false);

  // useEffect(()=>{

  // if(DarkMode.value)
  //   document.body.classList.remove("dark");
  // else
  // document.body.classList.add("dark");

  // },[DarkMode])

const location = useLocation();
const name = location.state?.name;

  return (
      <div >
       <h1>Its working fine {name}</h1> 
        <Dark/>
       </div>
  )
}

export default App
