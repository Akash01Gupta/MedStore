import React, {  useContext, } from 'react';
import { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker, } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { AddContext } from '../../context/storemapcontext/AddContext';

function CreateStoreMap() {
	const {dispatch} = useContext(AddContext);
	// const [showPopup, togglePopup] = useState(null);
	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: 21.7679,
		longitude: 78.8718,
		zoom: 3.5
	});

	const mapRef = useRef();
	const handleViewportChange = useCallback(
		(newViewport) => setViewport(newViewport),
		[]
	);

	const handleGeocoderViewportChange = useCallback(
		(newViewport) => {
			const geocoderDefaultOverrides = { transitionDuration: 1000 };
			dispatch({type: "UPDATE_ADDRESS", payload: {latitude: newViewport.latitude, longitude: newViewport.longitude}});
			return handleViewportChange({
				...newViewport,
				...geocoderDefaultOverrides
			});
		},
		[dispatch, handleViewportChange] // Add dispatch to the dependency array
	);
	

	return (
		<ReactMapGL
		className="mapView"
			ref={mapRef}
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
			onViewportChange={handleViewportChange}
			mapStyle="mapbox:/styles/icon-1709394272/61e04bd795928a7fa6ef587e22dfe223"
		>
			<Geocoder
				mapRef={mapRef}
				onViewportChange={handleGeocoderViewportChange}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				position="top-left"
			/>
            <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}></Marker>
			{/* {
				userData.map((data) => {
					return (
						<div key={data.id}>
							<Marker latitude={data.lati} longitude={data.long} offsetLeft={-20} offsetTop={-10}>
							<i className="fas fa-clinic-medical" style={{ fontSize: "20px", color: '#ff0000' }} onClick={() => togglePopup(data.id)}></i>
							<i className="fas fa-map-marker-alt" ></i> 
							</Marker>
							{
								(data.id === showPopup) && <Popup
									latitude={data.lati}
									longitude={data.long}
									closeButton={true}
									closeOnClick={false}
									onClose={() => togglePopup(null)}
									anchor="bottom" >
									<div>{data.name}</div>
								</Popup>
							}

						</div>
					)
				})
			} */}
		</ReactMapGL>
	)
}

export default CreateStoreMap;