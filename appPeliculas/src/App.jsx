//Librerias
import {Routes, Route} from 'react-router-dom'
//Componentes
import Login from "./components/Login"
import Listado from './components/Listado'

function App() {

  return (
    <>
    {/*Routes es lo mismo que Switch */}
      <Routes>
        {/*Route es la ruta donde se renderiza el componente */}
        <Route exact path='/' Component={Login}/>
        <Route path='/listado' Component={Listado}/>
      </Routes>
    </>
  )
}

export default App
