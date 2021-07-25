/* eslint-disable react/prop-types */
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditionParcoursList(props) {
  const { putParcours, setPutParcours, parcours } = props;

  const handlePutParcours = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/parcours`, { putParcours })
      .then((response) => {
        JSON.stringify(
          console.log(response),
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
  };
  console.log(parcours);
  console.log(putParcours);

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
                id={item.id}
                className="putItems"
              >
                {console.log(item)}
                {() => {
                  if (putParcours.title === null) {
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      title: item.title,
                    });
                  }
                }}
                <input
                  defaultValue={item.title}
                  htmlFor="title"
                  name="title"
                  onChange={(e) => {
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      title: e.target.value,
                    });
                  }}
                />
                {console.log(putParcours)}
                <input
                  defaultValue={item.date}
                  htmlFor="date"
                  type="date"
                  name="date"
                  onChange={(e) => {
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      date: e.target.value,
                    });
                  }}
                />
                <input
                  defaultValue={item.description}
                  name="description"
                  htmlFor="description"
                  onChange={(e) =>
                    setPutParcours({
                      ...putParcours,
                      id: item.id,
                      description: e.target.value,
                    })
                  }
                />
                <div className="btnWidth">
                  <button
                    type="button"
                    onClick={handlePutParcours}
                    className="btnPut"
                  >
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
