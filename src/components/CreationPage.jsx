/* eslint-disable no-undef */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreationPage() {
  const history = useHistory(null);
  const [picture, setPicture] = useState(null);
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
            title: `Un nouvel élément a été ajouté a ton histoire !`,
          })
        );
      });
  };
  const handleRecipe = (event) => {
    event.preventDefault();
    const newRecipe = new FormData();
    newRecipe.append('file', picture);
    newRecipe.append('title', recipe.title);
    newRecipe.append('description', recipe.description);
    newRecipe.append('ingredient', recipe.ingredient);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipe`, newRecipe, config)
      .then((response) => {
        JSON.stringify(
          response,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Ta nouvelle recette a été ajoutée`,
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
      <form
        className="creation"
        onSubmit={handleRecipe}
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="file"
          label="file"
          name="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />
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
