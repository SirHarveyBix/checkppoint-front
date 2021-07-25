/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Edition.css';
import { useHistory } from 'react-router-dom';
import EditionParcoursList from './EditionParcoursList';
import EditionRecipeList from './EditionRecipeList';

export default function CreationPage() {
  const history = useHistory(null);
  const [parcours, setParcours] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [putParcours, setPutParcours] = useState({
    title: null,
    description: null,
    date: null,
  });
  const [putRecipe, setPutRecipe] = useState({
    title: '',
    description: '',
    ingredient: '',
  });

  const getData = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parcours`)
        .then((response) => {
          const date = response.data.map((item) => new Date(item.date));
          const dateFormated = date.map((item) =>
            item.toLocaleDateString('en-CA')
          );
          setParcours(
            response.data,
            ...response.data.map(
              (item, i = 1) => (item.date = dateFormated[i].toString())
            )
          );
        });
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/recipe`)
        .then((response) => {
          setRecipe(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="putData">
      <div className="parcours">
        <strong>Modifies les elements de ton parcours</strong>
        {!parcours ? (
          <p />
        ) : (
          <EditionParcoursList
            putParcours={putParcours}
            setPutParcours={setPutParcours}
            parcours={parcours}
          />
        )}
      </div>
      <div className="recipe">
        <strong>Modifies tes recettes</strong>
        {!recipe ? (
          <p />
        ) : (
          <EditionRecipeList
            putRecipe={putRecipe}
            setPutRecipe={setPutRecipe}
            recipe={recipe}
          />
        )}
      </div>
      <button type="button" onClick={() => history.push('/CreateData')}>
        creer de de nouvelles entrées
      </button>
    </div>
  );
}
