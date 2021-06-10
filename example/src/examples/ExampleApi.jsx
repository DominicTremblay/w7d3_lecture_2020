import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './exampleApi.css';

const ExampleApi = (props) => {
  // apiUrl => `/api/${process.env.REACT_APP_API_TOKEN}/${heroId}`

  const [heroId, setHeroId] = useState(Math.floor(Math.random() * 730) + 1);
  const [heros, setHeros] = useState([]);

  // Api request...

  useEffect(() => {
    axios
      .get(`/api/${process.env.REACT_APP_API_TOKEN}/${heroId}`)
      .then((response) => {
        console.log(response.data);

        const newHero = response.data;

        // add the hero to the list of heroes
        setHeros((prevHeros) => [...prevHeros, newHero]);
      })
      .catch((err) => console.log(err.message));
  }, [heroId]);

  // create a list of superheros components (JSX)

  const herosList = heros.map((hero) => (
    <div className="card" style={{ width: '18rem' }}>
      <img src={hero.image.url} className="card-img-top" alt={hero.name} />

      <div className="card-body">
        <h3>{hero.name}</h3>
        <p className="card-text">
          <ul>
            <li>Intelligence: {hero.powerstats.intelligence}</li>
            <li>strength: {hero.powerstats.strength}</li>
            <li>speed: {hero.powerstats.speed}</li>
            <li>power: {hero.powerstats.power}</li>
          </ul>
        </p>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h1>SuperHero API</h1>

      {herosList}

      <input
        type="button"
        value="Add Hero"
        onClick={() => setHeroId(Math.floor(Math.random() * 700) + 1)}
      />
    </div>
  );
};

export default ExampleApi;
