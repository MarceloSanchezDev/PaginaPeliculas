import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate  } from 'react-router-dom';
import Swal from "sweetalert2";
function Resultados(props) {
    console.log(props)
    const [resultadoPeliculas , setResultadoPeliculas ] = useState([])

    const navigate = useNavigate()

    let token = sessionStorage.getItem('token')

    useEffect(()=>{
            
            if(!token){navigate('/')}
            
    },[token,navigate])

    let query = new URLSearchParams(window.location.search)
    let keyword= query.get('keyword')
    
    useEffect( ()=>{
        const fetchResults = async () => {
            if(props.api_key !== null){
                    try {
                        // Hacer el pedido a la API
                        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${props.api_key}&language=es-ES&query=${keyword}`)
                        .then(res =>{
                            setResultadoPeliculas(res.data.results)
                            if(res.data.results.length == 0){
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Tu busqueda no tuvo resultados',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'})
                            }
                        } ) .catch((e)=>{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Error de conexion',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                            console.log(e)
                
                        }) 
                                    
                    } catch (error) {
                        // Manejo de errores
                        console.error("Error al obtener los datos de la API:", error);
                        Swal.fire({
                            title: 'Error, intenta más tarde!',
                            text: 'Error de conexión',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                    }
            }
        };

        fetchResults();
        },[keyword,props.api_key])
    return(
        <>
        {resultadoPeliculas &&
        <>
        <h2>Seccion de Resultados</h2>
        <p>Estas Buscando : {keyword}</p>
        {resultadoPeliculas.length === 0 && <h1>Error!</h1>}
        <div className="row">
        {resultadoPeliculas.map((movie)=>{
                    return(
                                <div className="col-12 col-md-4 my-4" key={movie.id}>
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
                                        {/*Mostramos el id en la URL */}
                                        <Link to={`/detalle?MovieID=${movie.id}`} className="btn btn-primary">View Detail</Link>
                                    </div>
                                </div>

                                </div>
                    )
                })}
        </div>
        </>
        }
        </>
    )
}
export default Resultados