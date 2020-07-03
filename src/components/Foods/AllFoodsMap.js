import React, { useState, useContext, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import FoodContext from '../../context/foods/foodContext'
import Preloader from '../Preloader'

const AllFoodsMap = () => {

    const foodContext = useContext(FoodContext);
    const { allFoods, loading, getAllFoods } = foodContext;

    useEffect(() => {

        let mounted = true;

        if(mounted){
            getAllFoods();
        }

        return () => {
            mounted = false;
        }

        // eslint-disable-next-line
    },[])

    const [viewPort, setViewPort] = useState({
        latitude: 41.61609643000048,
        longitude: -72.82920259099967,
        width: "100vw",
        height: "100vh",
        zoom: 10
      })


    const [selectedFarm, setSelectedFarm] = useState(null);

    if(loading){
        return <Preloader />
    }

    return (
        <div>
            <ReactMapGL {...viewPort}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY} 
            onViewportChange={viewPort => setViewPort(viewPort)}
            mapStyle={process.env.REACT_APP_MAPBOX_MAP_STYLE}>
                
            { allFoods && allFoods.map(
                (food, index) => <Marker key={index} latitude={+food.location_1.latitude} longitude={+food.location_1.longitude}>
                    <button onClick={ e => {
                        e.preventDefault();
                        setSelectedFarm(food)
                    } }>
                                            <img src="./icons/apple.svg"    alt="" className="responsive-img" style={{'width': '2rem', 'height': '2rem'}}/>
                    </button>
                </Marker>
            ) }

            { allFoods && selectedFarm && <Popup latitude={+selectedFarm.location_1.latitude} longitude={+selectedFarm.location_1.longitude} onClose={ e => setSelectedFarm(null) }>
                <div className="container">
                    <p>
                        <span className="red-text">Category: </span>{selectedFarm.category}
                    </p>
                    <p>
                        <span className="red-text">Item: </span>{selectedFarm.item}
                    </p>
                    <p>
                        <span className="red-text">Phone: </span>{selectedFarm.phone1}
                    </p>
                    <p>
                        <span className="red-text">Zipcode: </span>{selectedFarm.zipcode}
                    </p>
                </div>
            </Popup> }


            </ReactMapGL>
        </div>
    )
}

export default AllFoodsMap;
