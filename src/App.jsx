import { useState } from 'react'
import './App.css'
import CreateUser from './components/Users/createUser'
import CreateMarca from './components/Marcas/CreateMarca'
import EditMarca from './components/Marcas/EditMarca'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContainer from './components/Users/UsersContainer'
import MarcaContainer from './components/Marcas/MarcaContainer'
import ModeloContainer from './components/Modelos/ModeloContainer'
import FabricanteContainer from './components/Fabricantes/FabricanteContainer'
import EquipoContainer from './components/Equipo/EquipoContainer'
import ClienteContainer from './components/Clientes/ClienteContainer'
import ProveedorContainer from './components/Proveedor/ProveedorContainer'
import InventarioContainer from './components/inventario/InventarioContainer'
import { Menubar } from 'primereact/menubar';
import LoginUser from './components/Users/loginUser'

function App() {

  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'inicio-sesion', icon: 'pi pi-user', url: '/inicio-sesion' },
    { label: 'Usuario', icon: 'pi pi-spin pi-cog', url: '/usuarios' },
    { label: 'Marca', icon: 'pi pi-apple', url: '/marcas' },
    { label: 'Modelo', icon: 'pi pi-android', url: '/modelos' },
    { label: 'Fabricante', icon: 'pi pi-microchip', url: '/fabricantes' },
    { label: 'Equipo', icon: 'pi pi-mobile', url: '/equipos' },
    { label: 'Cliente', icon: 'pi pi-id-card', url: '/clientes' },
    { label: 'Inventario', icon: 'pi pi-box', url: '/inventario' },
    { label: 'Proveedor', icon: 'pi pi-truck', url: '/proveedores' }
  ]

  return (
    <BrowserRouter>
      <Menubar model={items} />
      <Routes>
        <Route path='/' element={
          <>
            <h2>Bienvenido a la página principal</h2>
            <p>
              En esta aplicación estoy consumiendo una API desarrollada con Flask para gestionar una tienda de celulares. Los usuarios pueden tener diferentes roles:
              <ul>
                <li><strong>Administrador</strong>: Ver información exclusiva y realizar un CRUD completo de usuarios y marcas.</li>
                <li><strong>Usuario Regular</strong>: Tiene acceso limitado y no puede crear usuarios ni marcas.</li>
              </ul>
              <p>
                Los tokens de autenticación se guardan en el <strong>LocalStorage</strong> para validar las acciones del usuario, permitiendo un acceso controlado basado en el rol asignado.
                Además, implementé validaciones en el ingreso de contraseñas y nombres de usuario, así como en la creación de marcas para asegurar que los datos sean correctos y completos.
              </p>
              <p>El flujo de trabajo incluye el inicio de sesión, donde el administrador ya está registrado en la base de datos, y las acciones CRUD están disponibles para gestionar usuarios y marcas en el sistema.</p>
            </p>
          </>
        } />
        <Route path='/usuarios' element={<UserContainer />} />
        <Route path='/nuevo-usuario' element={<CreateUser />} />
        <Route path='/inicio-sesion' element={<LoginUser />} />
        <Route path='/marcas' element={<MarcaContainer />} />
        <Route path='/modelos' element={<ModeloContainer />} />
        <Route path='/fabricantes' element={<FabricanteContainer />} />
        <Route path='/equipos' element={<EquipoContainer/>} />
        <Route path='/nueva-marca' element={<CreateMarca/>} />
        <Route path='/clientes' element={<ClienteContainer/>} />
        <Route path="/modificar-marca/:id" element={<EditMarca />} />
        <Route path="/proveedores" element={<ProveedorContainer />} />
        <Route path="/inventario" element={<InventarioContainer />} />
      </Routes> 
      <h2>EFI-Sivit</h2>
    </BrowserRouter>
  )
}

export default App
