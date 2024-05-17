import React from 'react'
import {Link} from "react-router-dom"
import '../style.css'


const GameMenu = () => {

    localStorage.clear()

    return(
        <div className='Menu'>
            <h1>Tous les jeux disponibles</h1>
            <nav>
                <a className='photoSearch'><Link to="/photoSearch/game"><h2>PHOTO SEARCH</h2></Link></a>
                <a className='animedle-menu'><Link to="/animedle/game"><h2>ANIMEDLE</h2></Link></a>
                <a className='bientot'><Link to="/"><h2>BIENTOT</h2></Link></a>
            </nav>
        </div>
    )
}

export default GameMenu