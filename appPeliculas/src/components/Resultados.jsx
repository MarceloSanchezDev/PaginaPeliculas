import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate  } from 'react-router-dom';
import Swal from "sweetalert2";
function Resultados() {
    const [resultadoPeliculas , setResultadoPeliculas ] = useState([])

    const navigate = useNavigate()

    let token = sessionStorage.getItem('token')

    useEffect(()=>{
            
            if(!token){navigate('/')}
            
    },[token,navigate])

    let query = new URLSearchParams(window.location.search)
    const apikey = import.meta.env.VITE_API_KEY
    let keyword= query.get('keyword')
    console.log(keyword)
    useEffect(()=>{
             axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=es-ES&query=${keyword}`)
            .then(res =>{
                setResultadoPeliculas(res.data.results)
                console.log(res.data)  
                if(res.data.results){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Tu busqueda no tuvo resultados',
                        icon: 'error',
                        confirmButtonText: 'Ok'})
                }
            } )
            .catch(e => Swal.fire({
                title: 'Error!',
                text: 'Error de conexion',
                icon: 'error',
                confirmButtonText: 'Ok'
            }))
        },[apikey,keyword])
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
                                <div className="col-4 my-4" key={movie.id}>
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