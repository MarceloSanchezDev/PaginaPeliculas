//Librerias
import { Link, useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
function Listado() {
    //Navigate para navegar entre rutas
    const navigate = useNavigate()
    let token = localStorage.getItem('token')
    //Protejo la ruta Login , si no hay token redirijo al Login    
    useEffect(()=>{
        if(!token){navigate('/')}
    },[token,navigate])
    return(
        <>
            <div className="row">
                {/* Estructura base */}
                <div className="col-3">
                    <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Movie title</h5>
                                <p className="card-text"> Review : Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <Link to="#" className="btn btn-primary">View Detail</Link>
                            </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Listado