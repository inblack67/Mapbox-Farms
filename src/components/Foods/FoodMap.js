import React, { useState, useContext, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import FoodContext from '../../context/foods/foodContext'
import Preloader from '../Preloader'

const Map = () => {

    useEffect(() => {
        const listner = e => {
            if(e.key === 'Escape'){
              setSelectedFarm(null)
            }
          }
      
          window.addEventListener('keydown', listner)
      
          return () => {
            window.removeEventListener('keydown', listner)
          }
    })

    const [viewPort, setViewPort] = useState({
        latitude: 41.61609643000048,
        longitude: -72.82920259099967,
        width: "100vw",
        height: "50vh",
        zoom: 10
      })

    const foodContext = useContext(FoodContext);

    const { foods, loading } = foodContext;

    const [selectedFarm, setSelectedFarm] = useState(null);

    if(loading){
        return <Preloader />
    }

    return (
        <div>
        <ReactMapGL {...viewPort} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY} 
        onViewportChange={viewPort => setViewPort(viewPort)}
        mapStyle={process.env.REACT_APP_MAPBOX_MAP_STYLE}
        >
            { foods && foods.map(food => 
                <Marker key={food.farmer_id} latitude={food.location_1.coordinates[1]} longitude={food.location_1.coordinates[0]}>
                    <button className='btn red pulse' onClick={ e => {
                        e.preventDefault();
                        setSelectedFarm(food)
                    } }>
                        <i className="material-icons">shopping_cart</i>
                    </button>
                </Marker>
            ) }

            { selectedFarm && <Popup latitude={selectedFarm.location_1.coordinates[1]} longitude={selectedFarm.location_1.coordinates[0]} onClose={ e => setSelectedFarm(null) } >
                <div className="container">
                    <p>
                    <span className="red-text">Name: </span> { selectedFarm.farm_name }
                    </p>
                    <p>
                    <span className="red-text">Phone: </span> { selectedFarm.phone1 }
                    </p>
                    <p>
                    <span className="red-text">Address: </span> { `${selectedFarm.location_1_address} ${selectedFarm.zipcode}` }
                    </p>
                    <p>
                        <span className="red-text">Category: </span> { `${selectedFarm.category} (${selectedFarm.item})` }
                    </p>
                </div>
            </Popup> }

        </ReactMapGL>
        </div>
    )
}

export default Map
