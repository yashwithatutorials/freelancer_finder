
import './App.css'
import Login from './components/Login/Login'
import Navbar from './components/navbar/Navbar'
import Signup from './components/Login/Signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Footer from './components/footer/footer'
import Home from './components/Home/Home'
import LoginNav from './components/Login/LoginNav'
function App() {
 

  return (
    <>
   
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginNav/>}/>
      
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
     </BrowserRouter>
      <Home/>
     <Footer/>
    </>
  )
}

export default App
