import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'
//Componentes

import Buscador from "./Buscador"
function Header(props) {
    let token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    const handlerSession = ()=>{
        sessionStorage.clear()
        navigate('/');
        swal.fire({
            title: 'Succes!',
            text: 'Perfecto, session finalizada',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    return(
        <>
        <header className='position-fixed w-100 top-0 start-0 z-1  '>
                <nav className="navbar navbar-expand-lg bg-black text-white">
                    <div className="container-fluid text-white">
                        <Link className="navbar-brand text-white" to={'/'}>
                        <i className="bi bi-film"></i> App Peliculas
                        </Link>
                            <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon text-white"></span>
                            </button>
                        {token && 
                        <>
                            <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup">
                                     <div className="navbar-nav text-white">
                                            <Link className="nav-link text-white" to={'listado'}>Listado</Link>
                                            <Link className="nav-link text-white" to={'favoritos'}>favoritos :  
                                            {token && 
                                            ` ${props.favoritos.length}`
                                            }
                                            

                                            </Link>
                                            <Buscador></Buscador>
                                            <button className="btn text-white" onClick={handlerSession}>Cerrar Sesion  <i className="bi bi-box-arrow-in-left ps-2 h-50"></i></button>
                                    </div>
                            </div>
                        </>
                            }
                    </div>
                </nav>        
        </header>
        </>
    )

}

export default Header