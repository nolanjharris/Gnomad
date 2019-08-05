import React, { Component } from 'react';
import { MapControl, withLeaflet } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import worldGeoJSON from 'geojson-world-map';


class SearchMap extends MapControl {


    createLeafletElement() {
        return GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            showMarker: true,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: false,
            searchLabel: 'search'
        });
    }


}

export default withLeaflet(SearchMap);