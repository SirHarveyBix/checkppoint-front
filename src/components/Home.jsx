/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [parcours, setParcours] = useState([]);

  const getParcours = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parcours`)
        .then((response) => {
          const date = response.data.map((item) => new Date(item.date));
          const dateFormated = date.map((item) =>
            item.toLocaleDateString('fr-FR')
          );
          setParcours(
            response.data,
            ...response.data.map(
              (item, i) => (item.date = dateFormated[i].toString())
            )
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParcours();
  }, []);

  return (
    <div>
      <div>
        <p>
          Bienvenu sur mon CV en ligne ! <br />
          Je suis [Prenom][Nom], vous allez decouvrir, mon parcours
          Professionel, et mes realisations.
        </p>
      </div>
      <div>
        {!parcours ? (
          <p />
        ) : (
          parcours.map((item) => (
            <div key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.date}</p>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
