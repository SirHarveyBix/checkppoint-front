/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Edition.css';

export default function CreationPage() {
  const [parcours, setParcours] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [putParcours, setPutParcours] = useState({
    id: 0,
    title: '',
    description: '',
    date: '',
  });
  const [putRecipe, setPutRecipe] = useState({
    id: 0,
    title: '',
    description: '',
    ingredient: '',
  });

  const getData = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parcours`)
        .then((response) => {
          const date = response.data.map((item) => item.date);
          const dateParsed = date.map((item) => new Date(item));
          const dateFormated = dateParsed.map((item) =>
            item.toLocaleDateString('fr-FR')
          );
          setParcours(
            response.data,
            ...response.data.map(
              (item, i) => (item.date = dateFormated[i].toString())
            )
          );
          setPutParcours(...response.data);
        });
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/recipe`)
        .then((response) => {
          setRecipe(response.data);
          setPutRecipe(response.data[0]);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePutParcours = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/parcours`, { putParcours })
      .then((response) => {
        JSON.stringify(
          response,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cet élément a été mis à jour`,
          })
        );
      })
      .then((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePutRecipe = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/recipe`, { putRecipe })
      .then((response) => {
        JSON.stringify(
          response,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cet élément a été mis à jour`,
          })
        );
      })
      .then((error) => {
        console.error(error);
      });
  };

  return (
    <div className="putData">
      <br />
      <div className="parcours">
        {!parcours ? (
          <p />
        ) : (
          parcours.map((item) => {
            return (
              <form
                type="submit"
                key={item.id}
                onSubmit={handlePutParcours}
                className="putItems"
              >
                <input
                  id={item.id}
                  name="title"
                  defaultValue={item.title}
                  onChange={(e) =>
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  id={item.id}
                  name="date"
                  defaultValue={item.date}
                  onChange={(e) =>
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      date: e.target.value,
                    })
                  }
                />
                <input
                  id={item.id}
                  name="description"
                  defaultValue={item.description}
                  onChange={(e) =>
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      description: e.target.value,
                    })
                  }
                />
                <div className="btnWidth">
                  <button type="submit" className="btnPut">
                    Mettre à jour
                  </button>
                </div>
              </form>
            );
          })
        )}
      </div>
      <div className="recipe">
        {!recipe ? (
          <p />
        ) : (
          recipe.map((item) => {
            return (
              <form
                type="submit"
                onSubmit={handlePutRecipe}
                key={item.id}
                className="putItems"
              >
                <input
                  id={item.id}
                  name="title"
                  defaultValue={item.title}
                  onChange={(e) =>
                    setPutRecipe({
                      ...putRecipe,
                      id: item.id,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  id={item.id}
                  name="ingredient"
                  defaultValue={item.ingredient}
                  onChange={(e) =>
                    setPutRecipe({
                      ...putRecipe,
                      id: item.id,
                      ingredient: e.target.value,
                    })
                  }
                />
                <input
                  id={item.id}
                  name="description"
                  defaultValue={item.description}
                  onChange={(e) =>
                    setPutRecipe({
                      ...putRecipe,
                      id: item.id,
                      description: e.target.value,
                    })
                  }
                />
                <div className="btnWidth">
                  <button type="submit" className="btnPut">
                    Mettre à jour
                  </button>
                </div>
              </form>
            );
          })
        )}
      </div>
    </div>
  );
}
