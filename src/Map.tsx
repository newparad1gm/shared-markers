import React from 'react';
import './App.css';
import { GoogleMap, InfoWindow, Marker, MarkerF } from '@react-google-maps/api';
import { InfoMarker } from './Data';

let newMarker: google.maps.Marker | undefined = undefined;

function Map(props: { data: any }) {
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(15); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 40.7128,
        lng: -74.0060
    });

    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onClick = (e: google.maps.MapMouseEvent) => {
        setActiveMarker(null);
        setClicks([...clicks, e.latLng!]);
    };

    const onAdd = (marker: google.maps.Marker, markerIndex: any) => {
        removeNew();
        newMarker = marker;
        setActiveMarker(markerIndex);
    }

    const removeNew = () => {
        newMarker && newMarker.setMap(null);
        newMarker = undefined;
    }

    let newMarkerText = '';
    const handleChange = (event: any) => {
        newMarkerText = event.target.value;
    }

    const handleClick = () => {
        console.log(newMarkerText);
    }

    return (
        <GoogleMap
            onClick={onClick}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
            center={center}
            zoom={zoom}
        >
            {(props.data as InfoMarker[]).map(({ 
                id, latLng, data
            }) => (
                <MarkerF
                    key={id}
                    position={latLng}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{data}</div>
                        </InfoWindow>
                    ) : null}
                </MarkerF>
            ))}
            {clicks.map((latLng, i) => (
                <MarkerF onLoad={(marker) => onAdd(marker, i)} key={i} position={latLng} >
                    {activeMarker === i ? (
                        <InfoWindow onCloseClick={() => removeNew()}>
                            <div>
                                <h3>Add Parking Spot or Bathroom Marker</h3>
                                <textarea
                                    onChange={handleChange}
                                />
                                <button onClick={handleClick}>Save</button>
                            </div>
                        </InfoWindow>
                    ) : null}
                </MarkerF>
            ))}
        </GoogleMap>
    );
}

export default Map;
