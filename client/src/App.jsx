
import './App.css'
import Login from './components/Login/Login'
import Navbar from './components/navbar/Navbar'
import Signup from './components/Login/Signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
function App() {
 

  return (
    <>
    
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navbar/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
