import axios from 'axios';
import { useState } from 'react';

export default function Connxion() {
  const [user, setUser] = useState({
    pseudo: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parcours`, user)
        .then((response) => {
          setUser(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          oChange={(e) =>
            setUser({
              ...user,
              pseudo: e.target.value,
            })
          }
        />
        <input
          oChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Connectes toi</button>
      </form>
    </div>
  );
}
