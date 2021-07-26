import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreationPage() {
  const history = useHistory(null);
  const [parcours, setParcours] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredient: '',
  });
  const handleParcours = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/parcours`, { parcours })
      .then((response) => {
        JSON.stringify(
          response,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cet élément a été mis à jour`,
          })
        );
      });
  };
  const handleRecipe = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipe`, { recipe })
      .then((response) => {
        JSON.stringify(
          response,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cet élément a été mis à jour`,
          })
        );
      });
  };

  return (
    <div>
      <strong>Creer une entrée dans ton parcours</strong>
      <form className="creation" onSubmit={handleParcours}>
        <input
          type="text"
          name="title"
          htmlFor="title"
          placeholder="Titre"
          onChange={(e) => {
            setParcours({
              ...parcours,
              title: e.target.value,
            });
          }}
        />
        <input
          type="date"
          name="date"
          htmlFor="date"
          placeholder="date"
          onChange={(e) => {
            setParcours({
              ...parcours,
              date: e.target.value,
            });
          }}
        />
        <input
          type="text"
          name="description"
          htmlFor="description"
          placeholder="description"
          onChange={(e) => {
            setParcours({
              ...parcours,
              description: e.target.value,
            });
          }}
        />
        <button type="submit"> Valider</button>
      </form>
      <strong>Creer une entrée dans tes Recettes</strong>
      <form className="creation" onSubmit={handleRecipe}>
        <input
          type="text"
          name="title"
          htmlFor="title"
          placeholder="Titre"
          onChange={(e) => {
            setRecipe({
              ...recipe,
              title: e.target.value,
            });
          }}
        />
        <input
          type="text"
          name="ingredient"
          htmlFor="ingredient"
          placeholder="Ingredients"
          onChange={(e) => {
            setRecipe({
              ...recipe,
              ingredient: e.target.value,
            });
          }}
        />
        <input
          type="text"
          name="description"
          htmlFor="description"
          placeholder="description"
          onChange={(e) => {
            setRecipe({
              ...recipe,
              description: e.target.value,
            });
          }}
        />
        <button type="submit"> Valider</button>
      </form>
      <br />
      <button type="button" onClick={() => history.push('/EditData')}>
        Modifier tes entrées
      </button>
    </div>
  );
}
