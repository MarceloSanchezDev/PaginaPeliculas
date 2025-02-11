//Librerias
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
//Componentes
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";
import Register from "./components/Register";
import axios from "axios";
//styles
import "./css/bootstrap.min.css";
import "./css/App.css";
import "./css/bootstrap.bundle.min.js";
//appps
function App() {
  const [api_key, setApikey] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const res = await axios.get("/api/apikey");
        setApikey(res.data.apikey);
      } catch (error) {
        console.error("Error obteniendo la API Key:", error);
      }
    }
    fetchApiKey();
  }, []);
  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const favMovies = localStorage.getItem("favs");

  let tempMoviesInFavs;

  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }
  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = {
      imgUrl,
      title,
      overview,
      id: btn.dataset.movieId,
    };

    let moviesIsInTheArray = tempMoviesInFavs.find(
      (m) => movieData.id === m.id
    );
    if (!moviesIsInTheArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    } else {
      tempMoviesInFavs = tempMoviesInFavs.filter((m) => movieData.id !== m.id);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    }
  };

  return (
    <div className="container mt-3">
      <Header favoritos={favorites} />
      {/*Routes es lo mismo que Switch */}
      <Routes>
        {/*Route es la ruta donde se renderiza el elemento */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/listado"
          element={
            <Listado
              api_key={api_key}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          }
        />
        <Route path="/detalle" element={<Detalle api_key={api_key} />} />
        <Route path="/resultados" element={<Resultados api_key={api_key} />} />
        <Route
          path="/favoritos"
          element={
            <Favoritos
              api_key={api_key}
              favorites={favorites}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
