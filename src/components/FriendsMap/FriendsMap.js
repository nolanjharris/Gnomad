import React, { Component } from 'react';
import { connect } from 'react-redux'
import { GeoJSON } from 'react-leaflet';
import CustomPopup from '../CustomPopup/CustomPopup';

class FriendsMap extends Component {

    render() {
        return (
            <>
                {this.props.friendsList.map((friend, i) => {
                    return (
                        friend.countries.includes(this.props.feature.properties.name.toLowerCase()) &&
                        <GeoJSON
                            key={`friend${i}`}
                            data={this.props.feature}
                            style={() => ({
                                stroke: false,
                                color: 'green',
                                weight: 0.5,
                                fillColor: "green",
                                fillOpacity: 0.2,
                            })}
                        >
                            <CustomPopup feature={this.props.feature} />
                        </GeoJSON>
                    )
                })}
            </>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        friendsList: reduxState.user.friendsList
    }
}

export default connect(mapStateToProps)(FriendsMap);