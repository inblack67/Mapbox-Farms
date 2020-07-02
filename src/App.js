import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import FoodState from './context/foods/FoodState'
import SearchFoods from './components/Foods/SearchFoods';
import FoodMap from './components/Foods/FoodMap'

function App() {

  useEffect(() => {
    // Materialize JS init
    M.AutoInit();
  });

  return (
    <FoodState>
      <div className="App black">
        <FoodMap />
        <SearchFoods />
      </div>
    </FoodState>
  );
}

export default App;
