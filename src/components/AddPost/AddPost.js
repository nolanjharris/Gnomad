import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, FeatureGroup, GeoJSON, TileLayer } from 'react-leaflet';
import { addPost } from '../../redux/reducers/postReducer';
import './AddPost.scss';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { Slide } from 'react-slideshow-image';


const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url: '',
            description: '',
            recommendations: '',
            imgArr: []
        }
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ imgArr: [...this.state.imgArr, resultEvent.info.secure_url] });
            this.setState({ image_url: resultEvent.info.secure_url })
        }
        console.log(this.state.imgArr);
    }

    handleSubmit = () => {

    }

    render() {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'dytja9xnd',
            uploadPreset: 'travels',
            sources: ['local', 'url', 'dropbox', 'facebook', 'instagram']
        },
            (error, result) => { this.checkUploadResult(error, result) })
        return (
            <div id="addPost">
                <div id="postContainer">
                    <LeafletMap
                        id="countryMap"
                        center={[26.588527, 8.4375]}
                        zoom={3}
                        zoomControl={false}
                        minZoom={3}
                        maxBoundsViscosity={1}
                        maxBounds={[[90, 180], [-90, -180]]}>
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/nolanjames/cjyp7eg2v0jju1coj57z5z4v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug'
                            attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'} />
                        <FeatureGroup>
                            <GeoJSON
                                data={this.props.postCountry}
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
                    {this.state.imgArr.length > 0 &&
                        <div className="slide-container">
                            <Slide {...properties}>
                                {this.state.imgArr.map((url, i) => {
                                    console.log(url);
                                    return (
                                        <div className="each-slide">
                                            <div style={{ 'backgroundImage': `url(${url})` }}>
                                            </div>
                                        </div>)
                                })}
                            </Slide>
                        </div>
                    }
                    <button onClick={() => widget.open()}>Add Images</button>
                    <ThemeProvider theme={theme}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Describe your Experience!"
                            rowsMax="10"
                            style={{ margin: 20, width: '60%' }}
                            helperText="What was great about your trip?"
                            multiline
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="What would you recommend?"
                            rowsMax="10"
                            style={{ margin: 30, width: '60%' }}
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
        postCountry: reduxState.post.postCountry
    }
}

export default connect(mapStateToProps, { addPost })(AddPost);