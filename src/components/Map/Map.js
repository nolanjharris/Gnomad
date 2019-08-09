import React, { createRef, Component } from 'react';
import { connect } from 'react-redux';
import { openPostForm } from '../../redux/reducers/postReducer';
import { requestVisitedList } from '../../redux/reducers/userReducer';
import './Map.scss';
import { Map as LeafletMap, FeatureGroup, ZoomControl, GeoJSON, TileLayer } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';
import SearchMap from '../SearchMap/SearchMap';
import CustomPopup from '../CustomPopup/CustomPopup';
import { updateGeojson } from '../../redux/reducers/mapReducer';


class Map extends Component {

    componentDidMount() {
        console.log(worldGeoJSON)
        this.props.updateGeojson(worldGeoJSON);
    }

    onFeatureGroupAdd = (e) => {
        // this.refs.map.leafletElement.fitBounds(this.refs.geojson.leafletElement.getBounds());
        console.log(e)
    }

    render() {
        let visited = [];
        this.props.visitedList.map(e => visited.push(e.country_name));
        if (this.props.userId && !this.props.requested) {
            this.props.requestVisitedList(this.props.userId)
        }
        // if (this.refs.map && this.refs.map.leafletElement && this.refs.geojson && this.refs.geojson.leafletElement) {
        //     this.refs.map.leafletElement.fitBounds(this.refs.geojson.leafletElement.getBounds());
        // }
        return (
            <div>
                <LeafletMap
                    id="map"
                    ref="map"
                    center={[26.588527, 8.4375]}
                    zoom={3}
                    zoomControl={false}
                    minZoom={2}
                    maxZoom={5}
                    maxBoundsViscosity={1}
                    maxBounds={[[90, 180], [-90, -180]]}>
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/nolanjames/cjyzw8gsf0v4t1coya5i7hm16/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug'
                        attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'} />

                    <FeatureGroup>
                        {this.props.geojson.features && this.props.geojson.features.map((feature, i) => {
                            const countryName = feature.properties.name.toLowerCase();
                            return (
                                visited.includes(countryName) ?
                                    <GeoJSON
                                        key={i}
                                        ref="geojson"
                                        data={feature}
                                        style={() => ({
                                            stroke: true,
                                            color: '#4a83ec',
                                            weight: 3,
                                            fillColor: "#4a83ec",
                                            fillOpacity: .6,
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
                    {this.props.searchMap &&

                        <FeatureGroup
                            onAdd={this.onFeatureGroupAdd}
                        >
                            <GeoJSON
                                data={this.props.bounds}
                                style={() => ({
                                    stroke: false,
                                    color: '#4a83ec',
                                    weight: 0.5,
                                    fillColor: "#1a1d62",
                                    fillOpacity: 0.05,
                                })}
                            >
                                <CustomPopup feature={this.props.bounds} />
                            </GeoJSON>
                        </FeatureGroup>}
                    <ZoomControl
                        position='topright'
                    />
                </LeafletMap>
            </div >
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        userId: reduxState.auth.userId,
        visitedList: reduxState.user.visitedList,
        requested: reduxState.user.requested,
        bounds: reduxState.map.bounds,
        geojson: reduxState.map.geojson,
        searchMap: reduxState.map.searchMap
    }
}

export default connect(mapStateToProps, { updateGeojson, openPostForm, requestVisitedList })(Map);