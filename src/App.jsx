import { useState } from 'react'
import './App.css'
import MyButton from './components/MyButton'
import CreateUser from './components/Users/createUser'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContainer from './components/Users/UsersContainer'
import { Menubar } from 'primereact/menubar';
import LoginUser from './components/Users/loginUser'


function App() {
  const [count, setCount] = useState(0)

  const items = [
    { label: 'Usuario', icon: 'pi pi-spin pi-cog', url: '/usuarios' },
    { label: 'Nuevo Usuario', icon: 'pi pi-users', url: '/nuevo-usuario' },
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'inicio-sesion', icon: 'pi pi-home', url: '/inicio-sesion' }
  ]

  return (
    <BrowserRouter>
      <Menubar model={items} />
      <Routes>
        <Route path='/' element={<h2>Bienvenido a la página principal</h2>} /> {/* Ruta para el home */}
        <Route path='/usuarios' element={<UserContainer />} />
        <Route path='/nuevo-usuario' element={<CreateUser />} />
        <Route path='/inicio-sesion' element={<LoginUser />} />
      </Routes>
      <h1>Vite + React</h1>

      <MyButton count={count} setCount={setCount} />
    </BrowserRouter>
  )
}

export default App
