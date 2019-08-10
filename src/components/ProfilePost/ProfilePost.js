import React, { Component } from 'react';
import "./ProfilePost.scss";
import ImageScroll from '../ImageScroll/ImageScroll';
import { removeUserCountry, closeProfile } from '../../redux/reducers/userReducer';
import { connect } from 'react-redux';
import { Map as LeafletMap, FeatureGroup, GeoJSON, TileLayer } from 'react-leaflet';

class ProfilePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentClass: 'closed'
        }
    }
    onFeatureGroupAdd = (e) => {
        this.refs.profileMap.leafletElement.fitBounds(e.target.getBounds());
    }

    handleContentToggle = () => {
        let newClass = this.state.contentClass === 'closed' ? 'open' : 'closed';
        this.setState({ contentClass: newClass })
    }

    handleRemoveCountry = (country) => {
        this.props.removeUserCountry(country);
        this.props.closeProfile();
    }

    render() {
        let post = this.props.posts.filter(e => e.country_name === this.props.country.properties.name.toLowerCase())
        return (
            <div className="profilePost">
                <div className="profilePostMain">
                    <LeafletMap
                        className="profileMap"
                        ref="profileMap"
                        center={[26.588527, 8.4375]}
                        zoom={3}
                        zoomControl={false}
                        minZoom={3}
                        maxZoom={6}
                        maxBoundsViscosity={1}
                        maxBounds={[[90, 180], [-90, -180]]}>
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/nolanjames/cjyzw8gsf0v4t1coya5i7hm16/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug'
                            attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'} />
                        <FeatureGroup
                            onAdd={this.onFeatureGroupAdd}
                        >
                            <GeoJSON
                                data={this.props.country}
                                style={() => ({
                                    stroke: false,
                                    color: '#4a83ec',
                                    weight: 2,
                                    fillColor: "#1a1d62",
                                    fillOpacity: 0.1,
                                })}
                            >
                            </GeoJSON>
                        </FeatureGroup>
                    </LeafletMap>
                    <div id="profilePostContent">
                        <h1>{this.props.country.properties.name}</h1>
                        <h3>You Visited on {post[0] ? post[0].upload_date : null}</h3>
                        <button onClick={this.handleContentToggle}>Show Your Post</button>
                        <button onClick={() => this.handleRemoveCountry(this.props.country.properties.name.toLowerCase())}>Remove Country From Your List</button>
                    </div>
                </div>
                <div id="profilePostContent" className={this.state.contentClass}>
                    {post[0] && post[0].image_urls.length > 0 &&
                        <ImageScroll imgArr={post[0].image_urls} />
                    }
                    <h5>Description</h5>
                    <p>{post[0] && post[0].post_content.split('!RECOMMENDATIONS!')[0]}</p>
                    <h5>Recommendations</h5>
                    <p>{post[0] && post[0].post_content.split('!RECOMMENDATIONS!')[1]}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        posts: reduxState.user.posts
    }
}

export default connect(mapStateToProps, { removeUserCountry, closeProfile })(ProfilePost);