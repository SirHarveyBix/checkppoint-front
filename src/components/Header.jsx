import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  return (
    <div className="container-header-button">
      {!click ? (
        <Link to="/MesRecettes">
          <button
            className="button-header-signin"
            type="button"
            onClick={handleClick}
          >
            Mes Recettes
          </button>
        </Link>
      ) : (
        <Link to="/">
          <button
            className="button-header-signin"
            type="button"
            onClick={handleClick}
          >
            Mon Parcours
          </button>
        </Link>
      )}
    </div>
  );
}
