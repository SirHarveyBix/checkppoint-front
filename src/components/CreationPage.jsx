import React, { useState } from 'react';
import axios from 'axios';

export default function CreationPage() {
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
        console.log(response);
      });
  };
  const handleRecipe = (event) => {
    event.preventDefault();
    console.log(recipe);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipe`, { recipe })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <p>Creer une entrée dans ton parcours</p>
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
      <p>Creer une entrée dans tes Recettes</p>
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
    </div>
  );
}
