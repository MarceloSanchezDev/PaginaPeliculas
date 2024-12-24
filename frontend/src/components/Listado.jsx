//Librerias
import swal from 'sweetalert2'
import { Link, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

function Listado( props ) {
    console.log(props)
    //inicializamos el estado del listado de peliculas
    const [listadoPeliculas ,setListadoPeliculas] = useState([])
    //Navigate para navegar entre rutas

    const navigate = useNavigate()

    //pedimos el token

    let token = sessionStorage.getItem('token')

    //Protejo la ruta Login , si no hay token redirijo al Login    

    useEffect(()=>{

        if(token === null){navigate('/')}

    },[token,navigate])

    useEffect(() => {
        const fetchMovies = async () => {
            if(props.api_key !== null){
                try {
                    // Construir el endpoint con la API Key
                    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${props.api_key}&language=en-ES&page=1`;
                    // Hacer el pedido a la API
                    const res = await axios.get(endPoint).then(res => res.data.results);
                    // Actualizar el estado con los resultados
                    setListadoPeliculas(res);
                } catch (error) {
                    // Manejo de errores
                    console.error("Error al obtener los datos de la API:", error);
                    swal.fire({
                        title: 'Error, intenta más tarde!',
                        text: 'Error de conexión',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                }
            
            }
        };

        fetchMovies();
    }, [props.api_key]);
    return(
        <>
            <div className="row mt-5 mb-5">
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
                                        <button className='favorite-btn' onClick={props.addOrRemoveFromFavs} data-movie-id = {movie.id}>
                                            🖤
                                            
                                        </button>
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title.substring(0,10)+ "..."}</h5>
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