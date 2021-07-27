/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

export default function Home() {
  const [recipe, setRecipe] = useState([]);
  const getRecipe = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/recipe`)
        .then((response) => {
          setRecipe(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      {!recipe ? (
        <p />
      ) : (
        recipe.map((item) => (
          <div key={item.id} className="container">
            <div className="imgRecipe">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${item.file}`}
                alt={item.title}
              />
            </div>
            <div className="content">
              <strong>{item.title}</strong>
              <p>{item.ingredient}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
