import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, FeatureGroup, GeoJSON, TileLayer } from 'react-leaflet';
import { addPost, closePostForm, submitEditPost } from '../../redux/reducers/postReducer';
import { requestVisitedList } from '../../redux/reducers/userReducer';
import './AddPost.scss';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import ImageScroll from '../ImageScroll/ImageScroll';


const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url: '',
            description: '',
            recommendations: '',
            date: '',
            imgArr: []
        }
    }

    componentDidMount() {
        if (this.props.editPost[0] && this.props.posts.length > 0) {
            let postIndex = this.props.posts.findIndex(e => e.post_id === this.props.editPost[1]);
            console.log(this.props.postCountry);
            const { image_urls, post_content, upload_date } = this.props.posts[postIndex];
            const contentSplit = post_content.split('!RECOMMENDATIONS!');
            this.setState({ imgArr: image_urls, description: contentSplit[0], recommendations: contentSplit[1], date: upload_date })
        }
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ imgArr: [...this.state.imgArr, resultEvent.info.secure_url] });
            this.setState({ image_url: resultEvent.info.secure_url })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        const postContent = `${this.state.description}!RECOMMENDATIONS!${this.state.recommendations}`
        const { date, imgArr } = this.state;
        if (this.props.editPost[0] && this.props.posts.length > 0) {
            const { properties } = this.props.postCountry[0];
            let country = properties.name.toLowerCase();
            let post = { imageArr: imgArr, postContent };
            this.props.submitEditPost(country, post)
        } else {
            const { properties } = this.props.postCountry;
            let country = properties.name.toLowerCase();
            let post = { date, imageArr: imgArr, country, postContent }
            this.props.addPost(post);
        }
        this.props.requestVisitedList(this.props.userId);
        this.props.closePostForm();
    }

    onFeatureGroupAdd = (e) => {
        this.refs.countryMap.leafletElement.fitBounds(e.target.getBounds());
    }

    backToMap = () => {
        this.props.closePostForm();
    }

    render() {
        let countryName = '';
        let postCountry = '';
        if (this.props.postCountry.properties) {
            const { properties } = this.props.postCountry;
            countryName = properties.name;
            postCountry = this.props.postCountry;
        } else if (this.props.postCountry[0].properties) {
            const { properties } = this.props.postCountry[0];
            countryName = properties.name;
            postCountry = this.props.postCountry[0];
        }
        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'dytja9xnd',
            uploadPreset: 'travles',
            sources: ['local', 'url', 'dropbox', 'facebook', 'instagram']
        },
            (error, result) => { this.checkUploadResult(error, result) })
        return (
            <div id="addPost">
                <div id="postContainer">
                    <button onClick={this.backToMap}>Back to Map</button>
                    <div id="postTitle">
                        <LeafletMap
                            id="countryMap"
                            ref="countryMap"
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
                                    data={postCountry}
                                    style={() => ({
                                        stroke: false,
                                        color: '#4a83ec',
                                        weight: 0.5,
                                        fillColor: "#1a1d62",
                                        fillOpacity: 1,
                                    })}
                                >
                                </GeoJSON>
                            </FeatureGroup>
                        </LeafletMap>
                        <div id="postInfoTitle">
                            <h1>{countryName}</h1>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    value={this.state.date}
                                    onChange={this.handleChange}
                                    name="date"
                                    id="outlined-date"
                                    label="Travel Date"
                                    helperText={`When did you visit ${countryName}?`}
                                    type="date"
                                    format="DD-MM-YYYY"
                                    style={{ margin: 10, width: '100%' }}
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ThemeProvider>

                            <button id="addImages" onClick={() => widget.open()}>Add Images</button>
                        </div>
                    </div>
                    {this.state.imgArr.length > 0 && <ImageScroll imgArr={this.state.imgArr} />}
                    <ThemeProvider theme={theme}>
                        <TextField
                            value={this.state.description}
                            id="postDescription"
                            name="description"
                            onChange={this.handleChange}
                            label="Describe your Experience!"
                            rowsMax="10"
                            style={{ margin: 10, width: '80%' }}
                            helperText="What was great about your trip?"
                            multiline
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            value={this.state.recommendations}
                            id="postSuggestion"
                            name="recommendations"
                            onChange={this.handleChange}
                            label="What would you recommend?"
                            rowsMax="10"
                            style={{ margin: 30, width: '80%' }}
                            helperText="What activites would you suggest to others who visit?"
                            multiline
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ThemeProvider>
                    <button onClick={this.handleSubmit}>Submit Post</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        editPost: reduxState.post.editPost,
        postCountry: reduxState.post.postCountry,
        posts: reduxState.post.posts,
        userId: reduxState.auth.userId
    }
}

export default connect(mapStateToProps, { addPost, requestVisitedList, submitEditPost, closePostForm })(AddPost);
