//Librerias
import axios from 'axios'
import swAlert from '@sweetalert/with-react';
import { useNavigate  } from 'react-router-dom';
function Login() {
    //Navigate para navegar entre rutas
    const navigate = useNavigate()
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
            swAlert(
                <div>
                    <h2>los campos no pueden estas vacios</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam vitae at totam fugit dolorem ipsa, temporibus blanditiis sapiente? Nobis vitae quaerat culpa voluptates officiis cumque ratione sunt doloremque commodi.</p>
                </div>
            );
            return
        }

        if(email !== "" && !regexEmail.test(email)){
            swAlert(
                <div>
                    <h2>debes escribir una direccion de correo valido</h2>
                </div>
            )
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
                swAlert(<h2>Perfecto, estas dentro</h2>)
                //guardamos el token que recibimos
                const tokenRecibido = res.data.token
                //lo guardamos en el localStorage
                localStorage.setItem('token', tokenRecibido);
                //redireccionamos 
                navigate('/listado')
            })
    }
    
    return(
        <>
        <h2>Formulario de Login</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Correo Electronico :</span>
                <br />
                <input type="email" name="email"/>
            </label>
            <br />
            <label>
                <span>Contraseña : </span>
                <br />
                <input type="password" name="password"/>
            </label>
            <br />
            <button type="submit">Ingresar</button>
        </form>
        </>
    )
}

export default Login