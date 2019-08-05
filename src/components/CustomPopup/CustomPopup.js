import React from 'react';
import { Popup } from 'react-leaflet';

function CustomPopup(props) {

    const handleClick = () => {
        alert('You clicked it bruh!')
    }
    return (
        <Popup>
            <p>You clicked on {props.countryName}</p>
            <button onClick={handleClick}>WOOHOOOOO!</button>
        </Popup>
    )
}

export default CustomPopup;