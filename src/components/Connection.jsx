import axios from 'axios';
import { useState } from 'react';

export default function Connection() {
  const [user, setUser] = useState({
    pseudo: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, { user })
        .then((response) => {
          setUser(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user);
  return (
    <div>
      <form type="submit" onSubmit={handleSubmit}>
        <input
          placeholder="pseudo"
          name="pseudo"
          type="text"
          onChange={(e) =>
            setUser({
              ...user,
              pseudo: e.target.value,
            })
          }
        />
        <input
          placeholder="Mot de passe"
          type="password"
          name="password"
          onChange={(e) =>
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
