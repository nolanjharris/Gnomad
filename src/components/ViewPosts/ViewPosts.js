import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageScroll from '../ImageScroll/ImageScroll';
import { closeViewPosts, deletePost, openEditPostForm, requestCountryPosts } from '../../redux/reducers/postReducer';
import { Map as LeafletMap, FeatureGroup, GeoJSON, TileLayer } from 'react-leaflet';
import './ViewPosts.scss';

class ViewPosts extends Component {

    backToMap = () => {
        this.props.closeViewPosts();
    }

    onFeatureGroupAdd = (e) => {
        this.refs.countryMapView.leafletElement.fitBounds(e.target.getBounds());
    }

    handleEdit = (id, country) => {
        this.props.openEditPostForm(id, country)
        console.log(country)
    }

    handleDelete = (id) => {
        this.props.deletePost(id);
    }

    render() {
        console.log(this.props.postCountry);
        return (
            <div id="viewPosts">
                <div id="viewPostsContainer">
                    <button id="backToMap" onClick={this.backToMap}>back to map</button>
                    <LeafletMap
                        id="countryMapView"
                        ref="countryMapView"
                        center={[26.588527, 8.4375]}
                        zoom={3}
                        zoomControl={false}
                        minZoom={3}
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
                                data={this.props.postCountry}
                                style={() => ({
                                    stroke: false,
                                    color: '#4a83ec',
                                    weight: 0.5,
                                    fillColor: "#1a1d62",
                                    fillOpacity: 0,
                                })}
                            >
                            </GeoJSON>
                        </FeatureGroup>
                    </LeafletMap>
                    {this.props.posts.map((post, i) => {
                        return (
                            <div key={'post' + i}>
                                <h1>{post.country_name}</h1>
                                <h4>{post.upload_date}</h4>
                                <ImageScroll imgArr={post.image_urls} />
                                <p>{post.post_content}</p>
                                {post.user_id === this.props.userId &&
                                    <div id="editDelete">
                                        <button onClick={() => this.handleEdit(post.post_id, this.props.postCountry)}>Edit</button>
                                        <button onClick={() => this.handleDelete(post.post_id)}>Delete</button>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        userId: reduxState.auth.userId,
        posts: reduxState.post.posts,
        postCountry: reduxState.post.postCountry
    }
}

export default connect(mapStateToProps, { closeViewPosts, openEditPostForm, deletePost, requestCountryPosts })(ViewPosts);