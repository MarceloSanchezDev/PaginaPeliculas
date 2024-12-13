import {Routes, Route} from 'react-router-dom'
import Login from "./components/Login"
import Listado from './components/Listado'

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route path='/listado' Component={Listado}/>
      </Routes>
    </>
  )
}

export default App
