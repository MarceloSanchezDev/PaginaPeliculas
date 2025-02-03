//Librerias
import swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Login() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  //Navigate para navegar entre rutas
  const navigate = useNavigate();
  //Protejo la ruta Login , si hay token redirijo al Listado
  useEffect(() => {
    if (token !== null) {
      navigate("/Listado");
    }
  }, [token, navigate]);

  //Manejamos el evento del formulario
  const submitHandler = (e) => {
    e.preventDefault();
    //Axios Post para mandar las credenciales a la API
    axios
      .post("api/index.js/auth/login", { email, password })
      .then((res) => {
        //lo guardamos en el sessionStorage
        sessionStorage.setItem("token", res.data.token);
        //guardamos el token que recibimos
        setToken(res.data.token);
        //Si resulta exitoso mandamos alerta
        swal.fire({
          title: "Succes!",
          text: "Perfecto, estas dentro",
          icon: "success",
          confirmButtonText: "Ok",
        });
        //redireccionamos
        navigate("/listado");
      })
      .catch((e) => {
        swal.fire({
          title: "Error al Iniciar Sesion",
          text: `${e.response.data.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <>
      <div className="row mt-5 mb-5">
        <div className="col-6 offset-3 mt-5 mb-5">
          <h2>Formulario de Login</h2>
          <form onSubmit={submitHandler}>
            <label className="form-label d-block mt-2">
              <span>Correo Electronico :</span>
              <br />
              <input
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
              />
            </label>
            <br />
            <label className="form-label d-block mt-2">
              <span>Contraseña : </span>
              <br />
              <input
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
              />
            </label>
            <br />
            <button className="btn btn-primary" type="submit">
              Ingresar
            </button>
          </form>
          <Link to={"/registro"}>Si no tienes una Cuenta, Regristrate</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
