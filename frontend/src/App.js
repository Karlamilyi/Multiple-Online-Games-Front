import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import GameMenu from "./onlineGame/gameMenu"
import PhotoSearchGame from "./onlineGame/photoSearch/game.jsx"
import PhotoSearchResult from "./onlineGame/photoSearch/result.jsx"
import AnimedleGame from "./onlineGame/animedle/game.jsx"
import AnimedleResult from "./onlineGame/animedle/result.jsx"


function App() {

  const [guessedAnime, setGuessedAnime] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameMenu/>}/>
          <Route path="/photoSearch/game" element={<PhotoSearchGame/>}/>
          <Route path="/photoSearch/result" element={<PhotoSearchResult/>}/>
          <Route path="/animedle/game" element={<AnimedleGame/>}/>
          <Route path="/animedle/result" element={<AnimedleResult/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
