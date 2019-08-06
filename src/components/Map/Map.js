import React, { Component } from 'react';
import './Map.scss';
import { Map as LeafletMap, FeatureGroup, ZoomControl, GeoJSON, TileLayer } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';
import SearchMap from '../SearchMap/SearchMap';
import CustomPopup from '../CustomPopup/CustomPopup';

let numMapClicks = 0;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ['United States', 'Czech Rep.', 'Germany', 'Italy', 'Ireland', 'Japan', 'Australia']
        }
    }

    addPopup = (e) => {
        this.setState({
            popup: {
                key: numMapClicks++,
                position: e.latlng
            }
        })
    }

    render() {
        console.log(worldGeoJSON)
        return (
            <div>
                <LeafletMap
                    id="map"
                    center={[26.588527, 8.4375]}
                    zoom={3}
                    zoomControl={false}
                    minZoom={3}
                    maxBoundsViscosity={1}
                    maxBounds={[[90, 180], [-90, -180]]}>
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/nolanjames/cjyp7eg2v0jju1coj57z5z4v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug'
                        attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'} />
                    <FeatureGroup>
                        {worldGeoJSON.features.map((feature, i) => {
                            const countryName = worldGeoJSON.features[i].properties.name;
                            return (
                                this.state.names.includes(countryName) ?
                                    <GeoJSON
                                        key={i}
                                        data={feature}
                                        style={() => ({
                                            stroke: false,
                                            color: '#4a83ec',
                                            weight: 0.5,
                                            fillColor: "#1a1d62",
                                            fillOpacity: 1,
                                        })}
                                    >
                                        <CustomPopup feature={feature} />
                                    </GeoJSON>
                                    :
                                    <GeoJSON
                                        key={i}
                                        data={feature}
                                        style={() => ({
                                            stroke: false,
                                            color: '#4a83ec',
                                            weight: 0.5,
                                            fillColor: "#1a1d62",
                                            fillOpacity: 0,
                                        })}
                                    >
                                        <CustomPopup feature={feature} />
                                    </GeoJSON>
                            )
                        })}
                    </FeatureGroup>

                    <ZoomControl
                        position='topright'
                    />
                    <SearchMap />
                </LeafletMap>
            </div >
        )
    }
}

export default Map;