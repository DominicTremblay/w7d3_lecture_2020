import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './exampleApi.css';

const ExampleApi = (props) => {
  // apiUrl => `/api/${process.env.REACT_APP_API_TOKEN}/${heroId}`
  const [heroId, setHeroId] = useState(Math.floor(Math.random() * 730) + 1);
  const [heros, setHeros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the data => axios request to the api for a particuler heroId

  useEffect(() => {
    axios({
      method: `GET`,
      url: `/api/${process.env.REACT_APP_API_TOKEN}/${heroId}`,
    })
      .then((response) => {
        setLoading(false);
        setHeros((prev) => [...prev, response.data]);
      })
      .catch((err) => console.log(`Error: ${err.message}`));
  }, [heroId]);

  // Update the heros with this new hero
  // Map through each hero in heros to ouput HTML

  const herosList = heros.map((hero) => (
    <div className="card" style={{ width: '18rem' }}>
      <img src={hero.image.url} className="card-img-top" alt={hero.name} />
      {hero.name}
      <div className="card-body">
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
      {loading && <h3>Loading...</h3>}
      {!loading && herosList}
      {!loading && (
        <input
          type="button"
          value="Add"
          onClick={(e) => setHeroId(Math.floor(Math.random() * 730) + 1)}
        />
      )}
    </div>
  );
};

export default ExampleApi;
