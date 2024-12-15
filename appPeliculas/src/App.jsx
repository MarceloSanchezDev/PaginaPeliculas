//Librerias
import {Routes, Route} from 'react-router-dom'
import { useEffect, useState } from "react"
//Componentes
import Login from "./components/Login"
import Listado from './components/Listado'
import Header from './components/Header'
import Footer from './components/Footer'
import Detalle from './components/Detalle'
import Resultados from './components/Resultados'
import Favoritos from './components/Favoritos'
//styles
import './css/bootstrap.min.css'
import './css/App.css'

function App() {
  const [favorites, setFavorites] = useState ([])
    useEffect(()=>{
        const favsInLocal = localStorage.getItem('favs')
        if(favsInLocal !== null){
            const favsArray = JSON.parse(favsInLocal)
            setFavorites(favsArray)
        }
    },[])

  const favMovies = localStorage.getItem('favs')

  let tempMoviesInFavs

  if(favMovies === null){
    tempMoviesInFavs = []
  }else{
    tempMoviesInFavs = JSON.parse(favMovies)
  }
  console.log(tempMoviesInFavs)
  const addOrRemoveFromFavs=(e)=>{
    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgUrl = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText

    const movieData = {
      imgUrl, title, overview,
      id : btn.dataset.movieId
    }

    let moviesIsInTheArray = tempMoviesInFavs.find(m => movieData.id === m.id)
    console.log(moviesIsInTheArray)
    if(!moviesIsInTheArray){
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs)
      console.log('se agrego la pelicula', movieData)
    }else{
      tempMoviesInFavs = tempMoviesInFavs.filter(m => movieData.id !== m.id);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      console.log('se elimino la pelicula', tempMoviesInFavs)
    }

  }

  return (
    <div className='container mt-3'>
      <Header favoritos = {favorites}/>
    {/*Routes es lo mismo que Switch */}
      <Routes>
          {/*Route es la ruta donde se renderiza el elemento */}
          <Route path='/' element={<Login/>}/>
          <Route path='/listado' element ={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
          <Route path='/detalle' element={<Detalle/>}/>
          <Route path='/resultados' element={<Resultados/>}/>
          <Route path="/favoritos" element={<Favoritos favorites = {favorites}addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
