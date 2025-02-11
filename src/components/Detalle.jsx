import axios from "axios";
import swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { useNavigate  } from 'react-router-dom';

function Detalle(props) {
    const [movie, setMovie] = useState(null)
    const navigate = useNavigate()
    let query = new URLSearchParams(window.location.search)

    let movieID= query.get('MovieID')
    
    let token = sessionStorage.getItem('token')
    useEffect(()=>{
        
        if(!token){navigate('/')}
        
    },[token,navigate])
    useEffect(()=>{
        const fetchMovieDetail = async () => {
            if(props.api_key !== null){
                    try {
                        // Hacer el pedido a la API
                        await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${props.api_key}&language=en-US`)
                        .then(res =>{
                            setMovie(res.data)
                        } );
                                    
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

        fetchMovieDetail();
            
    },[movieID,props.api_key])
    return(
        <>
        {!movie && <p>Cargando....</p>}
        {movie &&
        <>
            <div className="row mt-5 mb-5">
                <h2 className="mt-5 mb-5" >Titulo : {movie.title}</h2>
                <div className="col-4">
                <img className="img-fluid"  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                    : "https://via.placeholder.com/500x750?text=No+Image"} alt={movie.title} />
                </div>
                <div className="col-8">
                    <h5>Fecha de Estreno: {movie.release_date}</h5>
                    <h5>Reseña:</h5>
                    <p>{movie.overview}</p>
                    <h5>Generos:</h5>
                    <ul>
                        {movie.genres.map(g => <li key={g.id}>{g.name}</li>)}
                    </ul>
                    <h5>Rating: {movie.vote_average}</h5>

                    </div>
                
            </div>
        </>
        }
        </>
    )
}


export default Detalle