//Librerias
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
function Listado() {
    //Navigate para navegar entre rutas
    const navigate = useNavigate()
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
            if(token === null){
                //Si el token es null devuelve a ruta netrual
                navigate('/')
            }
        },[])
        
    return(
        <h2>Soy un Listado</h2>
    )
}

export default Listado