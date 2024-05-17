import React from 'react';
import '../../style.css'
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom si vous utilisez React Router pour la navigation

const AnimedleResult = ({ guessedAnime }) => {

    if (!guessedAnime) {
        return <p>Chargement en cours...</p>;
    }

  return (
    <div className="result-page">
      <h1>Résultat</h1>
      <div>
        <h2>Anime à deviner :</h2>
        <p>Nom : {guessedAnime.anime_name}</p>
        <p>Theme : {guessedAnime.anime_theme}</p>
        <p>Date : {guessedAnime.anime_date}</p>
        <p>Nb Episodes : {guessedAnime.anime_episodes}</p>
        <p>Studio : {guessedAnime.anime_studio}</p>
        <p>Type : {guessedAnime.anime_type}</p>
      </div>
      <Link to="/animedle/game">
        <button>Relancer une partie</button>
      </Link>
    </div>
  );
}

export default AnimedleResult;