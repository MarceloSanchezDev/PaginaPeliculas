import axios from 'axios'
import swAlert from '@sweetalert/with-react';
import { useNavigate  } from 'react-router-dom';
function Login() {

    const navigate = useNavigate()

    console.log(navigate)
    
    const submitHandler = (e)=>{
        e.preventDefault()
        //guardamos los inputs values
        const email = e.target.email.value
        const password = e.target.password.value
        
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
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

        console.log("Credenciales Validas")
        axios.post('http://challenge-react.alkemy.org',{email,password})
            .then(res => {
                swAlert(<h2>Perfecto, estas dentro</h2>)
                const tokenRecibido = res.data.token
                localStorage.setItem('token', tokenRecibido);
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