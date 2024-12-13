//Librerias
import swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Login() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    //Navigate para navegar entre rutas
    const navigate = useNavigate()
    //Protejo la ruta Login , si hay token redirijo al Listado
    useEffect(() => {
        if (token !== null) {
          navigate('/Listado');
        }
      }, [token, navigate]);

    //Manejamos el evento del formulario
    const submitHandler = (e)=>{
        e.preventDefault()
        //guardamos los inputs values
        const email = e.target.email.value
        const password = e.target.password.value
        //Regex para validar el Email
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //Validaciones
        if(email === "" || password === ""){
            swal.fire({
                title: 'Error, los campos no pueden estas vacios!',
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam vitae at totam fugit dolorem ipsa,',
                icon: 'error',
                confirmButtonText: 'Cool'
            })           
            return
        }

        if(email !== "" && !regexEmail.test(email)){
            swal.fire({
                title: 'Error!',
                text: 'debes escribir una direccion de correo valido',
                icon: 'error',
                confirmButtonText: 'Cool'
            }) 
            return
        }

        if (email !== "challenge@alkemy.org" && password !== "react") {
            swAlert(
                <div>
                    <h2>Credenciales Invalidas</h2>
                </div>
            )
            return
        }
        //Axios Post para mandar las credenciales a la API
        axios.post('http://challenge-react.alkemy.org',{email,password})
            .then(res => {
                //Si resulta exitoso mandamos alerta
                swal.fire({
                    title: 'Succes!',
                    text: 'Perfecto, estas dentro',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                //guardamos el token que recibimos
                setToken( res.data.token)
                //lo guardamos en el localStorage
                localStorage.setItem('token', token);
                //redireccionamos 
                navigate('/listado')
            })
        
    }
    return(
        <>
        <div className='row'>
            <div className='col-6 offset-3'>
                    <h2>Formulario de Login</h2>
                    <form onSubmit={submitHandler}>
                        <label className='form-label d-block mt-2'>
                            <span>Correo Electronico :</span>
                            <br />
                            <input className='form-control' type="email" name="email"/>
                        </label>
                        <br />
                        <label className='form-label d-block mt-2'>
                            <span>Contraseña : </span>
                            <br />
                            <input className='form-control' type="password" name="password"/>
                        </label>
                        <br />
                        <button className='btn btn-primary' type="submit">Ingresar</button>
                    </form>
            </div>   
        </div>
        </>
    )
}

export default Login