import { useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

function Favoritos(props) {
    let token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{

        if(token === null){navigate('/')}

    },[token,navigate])
    return(
        <>
            <div className="row">
                {/* Estructura base */}
                {props.favorites.map((movie, ind)=>{
                    return(
                                <div className="col-3 my-4" key={ind}>
                                    <div className="card">
                                        <img 
                                            src={movie.imgUrl 
                                                ? `https://image.tmdb.org/t/p/w500/${movie.imgUrl}` 
                                                : "https://via.placeholder.com/500x750?text=No+Image"} 
                                            className="card-img-top" 
                                            alt={movie.title || "Movie poster"} 
                                        />
                                        <button className='favorite-btn' onClick={props.addOrRemoveFromFavs} data-movie-id = {movie.id}>
                                            🖤
                                        </button>
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title.substring(0,30)}</h5>
                                            <p className="card-text">{movie.overview.substring(0,100)}</p>
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

export default Favoritos