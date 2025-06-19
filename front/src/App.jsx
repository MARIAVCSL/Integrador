import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import SignUp from './pages/signup/signup.jsx';
import Sensores from './pages/sensores/sensores.jsx';
import Ambientes from './pages/ambientes/ambientes.jsx';
import Historico from './pages/histórico/histórico.jsx';
import Mapa from "./pages/mapa/mapa.jsx"

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/sensores" element={<Sensores />} />
          <Route path="/ambientes" element={<Ambientes />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
