import React from 'react';
import { Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { openPostForm, requestCountryPosts, openViewPosts } from '../../redux/reducers/postReducer';

function CustomPopup(props) {

    const handleAddToVisited = () => {
        props.openPostForm(props.feature)
    }

    const handlePostsByCountry = () => {
        props.requestCountryPosts(props.feature)
    }

    return (
        <Popup>
            <p>You clicked on {props.feature.properties.name}</p>
            <button onClick={handleAddToVisited}>Add to Visited List!</button>
            <button onClick={handlePostsByCountry}>View all posts</button>
        </Popup>
    )
}

export default connect(undefined, { openPostForm, openViewPosts, requestCountryPosts })(CustomPopup);