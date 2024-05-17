import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style.css';

const baseURL = "http://localhost:3200/animedle/";
const suggestionsURL = "http://localhost:3200/animedle/suggestions";


const AnimedleGame = ( {} ) => {
    const [anime, setAnime] = useState({});
    const [guess, setGuess] = useState('');
    const [verification, setVerification] = useState([]);
    const [tentatives, setTentatives] = useState([]);
    const [nomAnimeValide, setNomAnimeValide] = useState(true); 
    const [suggestions, setSuggestions] = useState([]);
  
    useEffect(() => {
      fetchRandomAnime();
    }, []);
  
    const fetchRandomAnime = () => {
      axios.get(`${baseURL}`).then((response) => {
        setAnime(response.data[0]); 
      });
    };
  
    const verif = (e) => {
        e.preventDefault();

        axios.get(`${baseURL}guess?anime_name=${guess}`).then((response) => {
          const guessedAnime = response.data[0];
          setVerification(guessedAnime);

          if (guessedAnime.error === "Anime not found") {
            setNomAnimeValide(false);
            return; 
            
          }

    
          const nomMatch = guessedAnime.anime_name === anime.anime_name;
          const themeMatch = compareThemes(guessedAnime.anime_theme, anime.anime_theme);
          const dateMatch = guessedAnime.anime_date === anime.anime_date;
          const episodesMatch = guessedAnime.anime_episodes === anime.anime_episodes;
          const studioMatch = guessedAnime.anime_studio === anime.anime_studio;
          const typeMatch = guessedAnime.anime_type === anime.anime_type;
    
          setTentatives((prevTentatives) => [
            {
              ...guessedAnime,
              nomMatch,
              themeMatch,
              dateMatch,
              episodesMatch,
              studioMatch,
              typeMatch
            },
            ...prevTentatives,
          ]);

          setNomAnimeValide(true);
        });
      }

    useEffect(() => {
        if (anime.anime_name && verification.anime_name) {
          if (anime.anime_name === verification.anime_name) {
            window.location.assign("/animedle/result")
          }
        }
      }, [anime, verification]);

    const compareThemes = (themes1, themes2) => {
        const themesList1 = themes1.split(',').map(theme => theme.trim());
        const themesList2 = themes2.split(',').map(theme => theme.trim());

        const commonThemes = themesList1.filter(theme => themesList2.includes(theme));

        if (commonThemes.length === 0) {
        return 'red-cell';
        } else if (commonThemes.length === themesList1.length && commonThemes.length === themesList2.length) {
        return 'green-cell';
        } else {
        return 'yellow-cell';
        }
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setGuess(inputValue);
    
        axios.get(`${suggestionsURL}?query=${inputValue}`).then((response) => {
          setSuggestions(response.data);
        });
      };

    console.log(anime.anime_name)
    return (
      <div className="animedle">
        <div className="animedle">
          <h1 id='title-animedle'>ANIMEDLE</h1>
          <h2 id='second-title-animedle'>Devinez l'anime:</h2>
          <form onSubmit={verif}>
            <input
                id='anime-input'
                type="text"
                placeholder="Entrez le nom de l'anime"
                value={guess}
                onChange={handleInputChange}
                list="anime-suggestions"
            />
            <datalist id="anime-suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>
            <button onClick={verif}>Vérifier</button>
            <button onClick={() => window.location.assign("/animedle/result")}>Abandonner</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Theme</th>
                <th>Date</th>
                <th>Nb Episodes</th>
                <th>Studio</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {tentatives.map((t, index) => (
                <tr key={index}>
                    <td className={t.nomMatch ? 'green-cell' : 'red-cell'}>{t.anime_name}</td>
                    <td className={t.themeMatch}>{t.anime_theme}</td>
                    <td className={t.dateMatch ? 'green-cell' : (t.anime_date > anime.anime_date ? 'red-cell arrow-up' : 'red-cell arrow-down')}>{t.anime_date} {t.anime_date < anime.anime_date ? '\u2191' : t.anime_date > anime.anime_date ? '\u2193' : null}</td>
                    <td className={t.episodesMatch ? 'green-cell' : (t.anime_episodes > anime.anime_episodes ? 'red-cell arrow-up' : 'red-cell arrow-down')}>{t.anime_episodes} {t.anime_episodes < anime.anime_episodes ? '\u2191' : t.anime_episodes > anime.anime_episodes ? '\u2193' : null}</td>
                    <td className={t.studioMatch ? 'green-cell' : 'red-cell'}>{t.anime_studio}</td>
                    <td className={t.typeMatch ? 'green-cell' : 'red-cell'}>{t.anime_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default AnimedleGame;
