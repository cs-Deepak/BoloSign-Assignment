import { useState } from 'react'
import './App.css'
import Home from './Component/Home'
import Header from './Component/Headers'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Error from './Component/Error'
import { Routes,Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';





function App() {
  const [count, setCount] = useState(0)
    const location = useLocation(); 

  return (
    <>
     {/* Conditionally render Header based on current path */}
     {location.pathname !== '/login'  && <Header />}

<Routes>
 
  <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/dashboard' element={<Dashboard />} />
   
  <Route path='*' element={<Error />} />  

</Routes>




      
    </>
  )
}

export default App
