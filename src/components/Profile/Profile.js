import React, { Component } from 'react';
import './Profile.scss';
import { connect } from 'react-redux';
import { closeProfile } from '../../redux/reducers/userReducer';
import ProfilePost from '../ProfilePost/ProfilePost';
import { Map as LeafletMap, FeatureGroup, GeoJSON, TileLayer } from 'react-leaflet';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryInfo: []
        }
    }

    componentDidMount() {
        this.setState({ countryInfo: this.props.visitedListGeojson })
    }

    findCurrentPost = (country) => {
        let countryId = this.props.visitedList.filter(e => e.country_name);
        let result = this.props.posts.filter(e => e.country_id === countryId.country_id);
        return result;
    }



    render() {

        return (
            <div id="profile">
                <div id="profileContainer">
                    <button onClick={this.props.closeProfile}>Back To Map</button>
                    <h1>{this.props.firstName} {this.props.lastName}</h1>
                    <h3>{this.props.username}</h3>
                    {this.state.countryInfo.length > 0 &&
                        this.state.countryInfo.map((country, i) => {
                            return <ProfilePost key={i} country={country} />
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.auth.username,
        firstName: reduxState.auth.firstName,
        lastName: reduxState.auth.lastName,
        posts: reduxState.user.posts,
        visitedList: reduxState.user.visitedList,
        visitedListGeojson: reduxState.map.visitedListGeojson
    }
}

export default connect(mapStateToProps, { closeProfile })(Profile);