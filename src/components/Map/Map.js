import React, { Component, useRef } from 'react';
import './Map.scss';
import { Map as LeafletMap, ZoomControl, GeoJSON, TileLayer } from 'react-leaflet';
import axios from 'axios';
import worldGeoJSON from 'geojson-world-map';
import LoginRegisterPopup from '../LoginRegisterPopup/LoginRegisterPopup';

function Map(props) {
    const mapRef = useRef(null);

    // componentDidMount() {
    //     axios.get('/api/countries').then(res => {
    //         this.setState({ countriesGeoJSON: res.data.countries });
    //     }).catch(error => console.log(error));
    // }

    const isLoggedIn = () => {
        mapRef.current.leafletElement.closePopup();
    }

    const onEachFeature = (feature, layer) => {

        if (feature.properties && feature.properties.name) {
            let countryName = String(feature.properties.name);
            let popup = `<div class="popup">
                            <h4>${feature.properties.name}</h4>
                            <button onclick="alertSomething('${countryName}')" class="trigger">Add to Visited</button>
                         </div>`
            layer.bindPopup(popup);
        }
        // layer.on({
        //     click: this.clickToFeature
        // })


    }

    // clickToFeature = (e) => {
    //     var layer = e.target;
    //     console.log(e.latlng);
    //     this.setState({
    //         clickedCountry: layer.feature.properties.name,
    //         popupLocation: e.latlng,
    //         popup: true
    //     });
    //     setTimeout(() => {
    //         this.setState({ popup: false });
    //     }, 500);
    // }


    return (
        <div>
            <LeafletMap
                id="map"
                onLeafletClick={(e) => console.log(e)}
                ref={mapRef}
                center={[26.588527, 8.4375]}
                zoom={2}
                zoomControl={false}
                minZoom={2}
                maxBounds={[[90, 180], [-90, -180]]}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/nolanjames/cjyp7eg2v0jju1coj57z5z4v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug'
                    attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'} />
                <GeoJSON
                    data={worldGeoJSON}
                    style={() => ({
                        stroke: false,
                        color: '#4a83ec',
                        weight: 0.5,
                        fillColor: "#1a1d62",
                        fillOpacity: 0,
                    })}
                    onEachFeature={onEachFeature}
                />
                <ZoomControl
                    position='topright'
                />
                <LoginRegisterPopup isLoggedIn={isLoggedIn} />
            </LeafletMap>
        </div >
    )
}

export default Map;