import React, { Component } from 'react';
import { MapWithGeocode } from '../../map/GoogleMap';

export class RentalMap extends Component {

    render() {
        const { location} = this.props;
        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&libraries=geometry,drawing,places"
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6xZT803oEX3uRHR21_bxpuBVz-TD_YHU&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location} 
            />)
    }
}

