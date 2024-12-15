import { Link } from 'react-router-dom';

//Componentes

import Buscador from "./Buscador"
function Header(props) {
    let token = sessionStorage.getItem('token')
    return(
        <>
        <header className='sticky-top  mb-10 '>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid ">
                        <a className="navbar-brand" href="#">App Peliculas</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            <Link className="nav-link" to={'listado'}>Listado</Link>
                            <Link className="nav-link" to={'favoritos'}>favoritos :  
                              {token && 
                              ` ${props.favoritos.length}`
                              }
                              

                              </Link>
                        </div>
                        </div>
                    </div>
                    <Buscador></Buscador>
                    </nav>        
        </header>
        </>
    )

}

export default Header