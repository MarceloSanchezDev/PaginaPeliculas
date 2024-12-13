import { Link } from "react-router-dom"

function Header() {
    return(
        <>
        <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">App Peliculas</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            <Link className="nav-link" to={'listado'}>Listado</Link>
                            <Link className="nav-link" to={'contacto'}>Contacto</Link>

                        </div>
                        </div>
                    </div>
                    </nav>        
        </header>
        </>
    )

}

export default Header