/* eslint-disable react/prop-types */
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditionRecipeList(props) {
  const { putRecipe, setPutRecipe, recipe } = props;
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
    <div className="recipe">
      {recipe.map((item) => {
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
      })}
    </div>
  );
}
