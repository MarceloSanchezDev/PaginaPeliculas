//Librerias
import swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react';
function Register() {
        const [email, setEmail] = useState(null)
        const [password, setPassword] = useState(null)
        const [repeatPassword, setRepeatPassword] = useState(null)
        const [user, setUser] = useState(null)
    
        //Manejamos el evento del formulario
        const submitHandler = (e)=>{
            e.preventDefault()
            //guardamos los inputs values
            //Regex para validar el Email
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            //Validaciones
            if(email === "" || password === "" || user === ''){
                swal.fire({
                    title: 'Error, los campos no pueden estas vacios!',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam vitae at totam fugit dolorem ipsa,',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })           
                return
            }
            if(password.length < 6){
                swal.fire({
                    title: 'Error, el largo de la contraseña no pueden ser menor a 6 digitos!',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam vitae at totam fugit dolorem ipsa,',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return
            }
            if(password !== repeatPassword ){
                swal.fire({
                    title: 'Error, las contraseñas no pueden ser distintas!',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam vitae at totam fugit dolorem ipsa,',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })           
                return
            }
    
            if(email !== "" && !regexEmail.test(email)){
                swal.fire({
                    title: 'Error!',
                    text: 'debes escribir una direccion de correo valido',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }) 
                return
            }
            console.log(email,password,user)
            //Axios Post para mandar las credenciales a la API
            //axios.post('http://localhost:3000/register',{email,password}).then(res => console.log(res).catch(e => console.log(e)))
            /*axios.post('http://challenge-react.alkemy.org',{email,password})
                .then(res => {
                    //lo guardamos en el sessionStorage
                    sessionStorage.setItem('token', res.data.token);
                    //guardamos el token que recibimos
                    setToken(res.data.token)
                    //Si resulta exitoso mandamos alerta
                    swal.fire({
                        title: 'Succes!',
                        text: 'Perfecto, estas dentro',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    //redireccionamos 
                    navigate('/listado')
                })*/
            
        }
    return(
        <>
        <div className='row'>
            <div className='col-6 offset-3'>
                    <h2>Formulario de Registro</h2>
                    <form onSubmit={submitHandler}>
                        <label className='form-label d-block mt-2'>
                            <span>Correo Electronico :</span>
                            <br />
                            <input className='form-control' onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email"/>
                        </label>
                        <label className='form-label d-block mt-2'>
                            <span>Usuario : </span>
                            <br />
                            <input className='form-control' onChange={(e)=>{setUser(e.target.value)}} type="text" name="user"/>
                        </label>
                        <label className='form-label d-block mt-2'>
                            <span>Contraseña : </span>
                            <br />
                            <input className='form-control' onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password"/>
                        </label>
                        <label className='form-label d-block mt-2'>
                            <span>Repetir Contraseña : </span>
                            <br />
                            <input className='form-control' onChange={(e)=>{setRepeatPassword(e.target.value)}} type="password" name="repeatpassword"/>
                        </label>
                        <br />
                        <button className='btn btn-primary' type="submit">Ingresar</button>
                    </form>
            </div>   
        </div>
        </>
    )
}
export default Register