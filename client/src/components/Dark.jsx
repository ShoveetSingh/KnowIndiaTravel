import React, { useEffect } from 'react'
import useDarkMode from 'use-dark-mode'

const Dark = () => {

  const DarkMode=useDarkMode();


useEffect(()=>{

  if(DarkMode.value)
    document.body.classList.remove("dark");
  else
  document.body.classList.add("dark");

  },[DarkMode])
  
  return (
    <div>
        <button onClick={DarkMode.toggle}>
    {DarkMode.value?"dark":"white"}
  </button>
  </div>
  )
}

export default Dark