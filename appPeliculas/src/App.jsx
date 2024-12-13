//Librerias
import {Routes, Route} from 'react-router-dom'
//Componentes
import Login from "./components/Login"
import Listado from './components/Listado'
import Header from './components/Header'
import Footer from './components/Footer'
//styles
import './css/bootstrap.min.css'

function App() {

  return (
    <div className='container mt-3'>
      <Header/>
    {/*Routes es lo mismo que Switch */}
      <Routes>
        {/*Route es la ruta donde se renderiza el componente */}
        <Route exact path='/' Component={Login}/>
        <Route path='/listado' Component={Listado}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
