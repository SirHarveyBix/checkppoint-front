/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import close from './image/close.png';

export default function EditionRecipeList(props) {
  const { putRecipe, setPutRecipe, recipe } = props;

  useEffect(() => {
    if (
      (putRecipe.id && putRecipe.title === null) ||
      (putRecipe.id && putRecipe.ingredient === null) ||
      (putRecipe.id && putRecipe.description === null)
    ) {
      recipe
        .filter((item) => item.id === putRecipe.id)
        .map((item) =>
          setPutRecipe({
            ...item,
            ingredient: item.ingredient,
            title: item.title,
            description: item.description,
          })
        );
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

  const handleDelete = (id) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'voulez vous vraiment supprimer cet element ?',
      confirmButtonText: 'Oui !',
      showCancelButton: true,
      cancelButtonText: 'Non !',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Supprimé !`, 'success');
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`, {
          id,
        });
      }
    });
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
            <div className="btn-close">
              <img
                src={close}
                className="delete"
                alt="delete"
                onClick={() => {
                  handleDelete(item.id);
                }}
              />
            </div>
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
