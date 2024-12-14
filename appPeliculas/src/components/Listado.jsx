//Librerias
import swal from 'sweetalert2'
import { Link, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Listado() {
    //inicializamos el estado del listado de peliculas
    const apikey = import.meta.env.VITE_API_KEY
    const [listadoPeliculas ,setListadoPeliculas] = useState([])

    //Navigate para navegar entre rutas

    const navigate = useNavigate()

    //pedimos el token

    let token = sessionStorage.getItem('token')

    //Protejo la ruta Login , si no hay token redirijo al Login    

    useEffect(()=>{

        if(token === null){navigate('/')}

    },[token,navigate])

    //consumimos la api (peliculas mas populares)

    useEffect(()=>{

        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-ES&PAGE=1}`

        //hacemos el pedido a la api

        axios.get(endPoint)

        .then(res => {

            //agarramos solo la data
            const apiData = res.data

            //agarramos solo los resultados 

            // y modificamos el estado del listado de peliculas
            setListadoPeliculas(apiData.results)
        }).catch(() => swal.fire({
                        title: 'Error, intenta mas tarde!',
                        text: 'Error de conexion',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })  )
    },[setListadoPeliculas])
    
    return(
        <>
            <div className="row">
                {/* Estructura base */}
                {listadoPeliculas.map((movie, ind)=>{
                    return(
                                <div className="col-3 my-4" key={ind}>
                                                    <div className="card">
                                    <img 
                                        src={movie.poster_path 
                                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                                            : "https://via.placeholder.com/500x750?text=No+Image"} 
                                        className="card-img-top" 
                                        alt={movie.title || "Movie poster"} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title.substring(0,30)+ "..."}</h5>
                                        <p className="card-text">{movie.overview.substring(0,100) + "..."}</p>
                                        {/*Mostramos el id en la URL */}
                                        <Link to={`/detalle?MovieID=${movie.id}`} className="btn btn-primary">View Detail</Link>
                                    </div>
                                </div>

                                </div>
                    )
                })}
                

            </div>
        </>
    )
}

export default Listado