/* eslint-disable react/prop-types */
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function EditionRecipeList(props) {
  const { putRecipe, setPutRecipe, recipe } = props;

  useEffect(() => {
    if (
      (putRecipe.id && !putRecipe.title) ||
      (putRecipe.id && !putRecipe.ingredient) ||
      (putRecipe.id && !putRecipe.description)
    ) {
      setPutRecipe({
        ...recipe[putRecipe.id - 1],
        ingredient: recipe[putRecipe.id - 1].ingredient,
        title: recipe[putRecipe.id - 1].title,
        description: recipe[putRecipe.id - 1].description,
      });
    }
  }, [putRecipe]);

  const handlePutRecipe = (e) => {
    e.preventDefault();
    if (!putRecipe.id) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Aucun element n'a été mis a jour`,
      });
    } else {
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
        .catch((error) => {
          JSON.stringify(
            console.error(error),
            error,
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `Une erreur est servenue.`,
            })
          );
        });
    }
  };
  return (
    <div className="recipe">
      {recipe.map((item) => {
        return (
          <form
            type="submit"
            onSubmit={handlePutRecipe}
            key={item.id}
            id={item.id}
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
      })}
    </div>
  );
}
