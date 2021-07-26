/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import close from './image/close.png';

export default function EditionParcoursList(props) {
  const { putParcours, setPutParcours, parcours } = props;
  useEffect(() => {
    if (
      (putParcours.id && !putParcours.title) ||
      (putParcours.id && !putParcours.date) ||
      (putParcours.id && !putParcours.description)
    ) {
      setPutParcours({
        ...parcours[putParcours.id - 1],
        date: parcours[putParcours.id - 1].date,
        title: parcours[putParcours.id - 1].title,
        description: parcours[putParcours.id - 1].description,
      });
    }
  }, [putParcours]);

  const handlePutParcours = (e) => {
    e.preventDefault();
    if (!putParcours.id) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Aucun element n'a été mis a jour`,
      });
    } else {
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
        console.log(parcours[id - 1].title);
        Swal.fire(
          `Supprimé !`,
          `${parcours[id - 1].title} est supprimé!`,
          'success'
        );
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/parcours`, {
          id,
        });
      }
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
