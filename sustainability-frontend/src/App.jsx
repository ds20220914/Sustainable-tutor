import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

const App=()=> {
  

  return (
    <div>
      <h1>MOI</h1>
      <Routes> 
        
        <Route path="/" element={<h2>Welcome to Sustainable learning app</h2>} /> 
      
      </Routes>
    </div>
  )
}

export default App
