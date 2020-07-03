import React, { useState, useContext, useEffect, useRef } from 'react'
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
import FoodContext from '../../context/foods/foodContext'
import Preloader from '../Preloader'
import useSuperCluster from 'use-supercluster'

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

const mapRef = useRef();

const points = allFoods ? allFoods.map(food => ({
type: "Feature",
properties: { cluster: false, foodId: food.farmer_id, category: food.category,  details: { item: food.item, zipcode: food.zipcode, phone: food.phone1 } },
geometry: {
type: "Point",
coordinates: [
parseFloat(food.location_1.longitude),
parseFloat(food.location_1.latitude)
]
}
})) : []

const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null; 

const { clusters, supercluster } = useSuperCluster({
points,
zoom: viewPort.zoom,
bounds,
options: {
radius: 75,
maxZoom: 20
}
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
mapStyle={process.env.REACT_APP_MAPBOX_MAP_STYLE} ref={mapRef}>

{ clusters && clusters.map(
(cluster, index) => {

const [longitude, latitude] = cluster.geometry.coordinates;

if(cluster.properties.cluster){
    return <Marker key={index} latitude={latitude} longitude={longitude}>
        <div className="container">
            <button className="btn red" onClick={ e => {
                const expansion = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)

                setViewPort({
                    ...viewPort,
                    latitude,
                    longitude,
                    zoom: expansion,
                    transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                        }),
                        transitionDuration: "auto"
                })

            } }>
                { cluster.properties.point_count }
            </button>
        </div>
    </Marker>
}

return <Marker key={index} latitude={latitude} longitude={longitude}>
<button onClick={e => setSelectedFarm(cluster)}>
    <img src="./icons/apple.svg" alt="" className="responsive-img" style={{ width: '2rem', height: '2rem' }}/>
</button>
</Marker>
}
) }

{ selectedFarm && <Popup latitude={selectedFarm.geometry.coordinates[1]} longitude={selectedFarm.geometry.coordinates[0]} onClose={ e => setSelectedFarm(null) }>
<div className="container center" style={{ width: '20rem' }}>
<p>
    <span className="red-text">Category: </span>{selectedFarm.properties.category}
</p>
<p>
    <span className="red-text">Item: </span>{selectedFarm.properties.details.item}
</p>
<p>
    <span className="red-text">Phone: </span>{selectedFarm.properties.details.phone}
</p>
<p>
    <span className="red-text">Zipcode: </span>{selectedFarm.properties.details.zipcode}
</p>
</div>
</Popup> }


</ReactMapGL>
</div>
)
}

export default AllFoodsMap;
