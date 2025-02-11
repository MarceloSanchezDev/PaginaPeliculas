import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Buscador() {
  const navigate = useNavigate();
  const submitHandfler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length < 4) {
      swal.fire({
        title: "Error!",
        text: "Debes escribir una palabra clave",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };
  return (
    <form onSubmit={submitHandfler} className="d-flex aling-items-center p-2">
      <label className="form-label mb-0 mx-2">
        <input
          type="text"
          className="form-control"
          name="keyword"
          placeholder="Escribe una palabra clave...."
        />
      </label>
      <button className="btn btn-success" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
