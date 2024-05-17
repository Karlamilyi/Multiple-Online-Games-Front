import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import '../../style.css'

const getURL = "http://localhost:3200/photosearch/";

const PhotoSearchGame = () => {
  const [photos, setPhotos] = useState([]);
  const [guess, setGuess] = useState('');
  const [numberPhotos, setNumberPhotos] = useState(0);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate(); 
  useEffect(() => {
    axios.get(getURL).then((response) => {
      setPhotos(response.data);
    });
  }, []);

  const handleGuess = (newGuess) => {
    console.log(points, numberPhotos);
    if (newGuess.date - guess === 0) {
      setPoints(points + 1);
      setNumberPhotos(numberPhotos + 1);
      alert('Bonne réponse');
      window.location.reload();
    } else {
      setNumberPhotos(numberPhotos + 1);
      alert('Mauvaise réponse');
      window.location.reload();
    }

    if (numberPhotos === 4) {
      window.location.assign(`/photoSearch/result?points=${points}`)
      }
    };
    

  return (
    <div className='newGuess'>
      {photos.map((newGuess) => (
        <div key={newGuess.id}>
          <h1>PHOTO SEARCH</h1>
          <img src={require('./img/' + newGuess.photo)} width="300px" alt="guessing" />
          <input
            type="number"
            placeholder="Devine l'année de prise de la photo"
            name="date"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button id="guessButton" onClick={() => handleGuess(newGuess)}>
            Envoyer
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhotoSearchGame;