import React from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { openPostForm } from '../../redux/reducers/postReducer';

function CustomPopup(props) {

    const handleClick = () => {
        props.openPostForm(props.feature)
    }
    return (
        <Popup>
            <p>You clicked on {props.feature.properties.name}</p>
            <button onClick={handleClick}>WOOHOOOOO!</button>
        </Popup>
    )
}

export default connect(undefined, { openPostForm })(CustomPopup);