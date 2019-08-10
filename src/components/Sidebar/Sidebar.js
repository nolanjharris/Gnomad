/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import logo from '../../logo.png';
import unitedStates from '../../unitedStates';
import continents from '../../continents';
import './Sidebar.scss';
import { logoutUser } from '../../redux/reducers/authReducer';
import { resetPost } from '../../redux/reducers/postReducer';
import { resetUser, openProfile, requestUserPosts, requestFriendsList } from '../../redux/reducers/userReducer';
import { searchMap, updateBounds, exitSearch, updateVisitedGeojson, toggleFriendsCountries } from '../../redux/reducers/mapReducer';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, InputLabel, NativeSelect, Input, MenuItem } from '@material-ui/core'

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap'
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: '120px',
//         display: 'flex',
//         'flex-direction': 'column'
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2)
//     }
// }))

// const classes = useStyles();
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            displayClass: 'closed',
            searchResults: [],
            searchValue: '',
            continent: ''
        }
    }

    getFriendsList = () => {
        if (this.props.userId) {
            this.props.requestFriendsList(this.props.userId);
        }
        this.handleSlideToggle();
        this.props.toggleFriendsCountries();
    }
    handleLogout = () => {
        this.props.logoutUser();
        this.props.resetPost();
        this.props.resetUser();
    }

    handleSearch = (e) => {
        let results = this.props.geojson.features.filter(country => country.properties.name.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log();
        this.setState({ searchResults: results, searchValue: e.target.value })
        this.props.exitSearch();
    }

    handleSearchedCountry = (country) => {
        if (country.properties.name.toLowerCase() === 'united states') {
            console.log(unitedStates);
        }
        this.props.searchMap();
        this.props.updateBounds(country);
        this.setState({ searchResults: [], searchValue: '' })
        setTimeout(() => {
            this.props.exitSearch();
        }, 200);
    }

    handleClearSearch = () => {
        this.props.exitSearch();
        this.props.updateBounds(continents.features[6]);
        this.setState({ continent: '' })
    }

    handleSearchedContinent = (e) => {
        this.setState({ continent: e.target.value });
        // this.props.exitSearch();
        let foundContinent = continents.features.filter(continent => continent.properties.name === e.target.value);
        console.log(foundContinent);
        this.props.searchMap();
        this.props.updateBounds(foundContinent[0]);
        // this.props.updateBounds(continents.features[6]);
    }

    handleProfileOpen = () => {
        this.props.requestUserPosts(this.props.userId);
        this.props.updateVisitedGeojson(this.props.visitedList);
        this.props.openProfile();
    }

    handleSlideToggle = () => {
        let display = (this.state.displayClass === 'closed' ? 'open' : 'closed');
        this.setState({
            menuOpen: !this.state.menuOpen,
            displayClass: display
        })
    }
    render() {


        return (
            <div className="sidebar" >
                <div id="sideBarTitle" onClick={this.handleSlideToggle} >
                    <h1><span className={this.state.displayClass}>GN</span><img src={logo} alt="gnomad" /><span className={this.state.displayClass}>MAD</span></h1>
                    <Icon
                        id="menuIcon"
                        color="action"
                        onClick={this.handleSlideToggle}
                        style={{ float: 'left', fontSize: '3em' }}>
                        {this.state.menuOpen ? 'close' : 'menu'}
                    </Icon>
                    {
                        this.props.loggedIn &&
                        <div className={this.state.displayClass} id="profileInfo">
                            <h3>Logged in as</h3>
                            <h4>{this.props.username}</h4>
                            <button onClick={this.handleProfileOpen}>Profile</button>
                            <a href="#" onClick={this.handleLogout}>logout</a>
                        </div>
                    }
                </div>
                <div className="menuItems">
                    <div className="iconDiv">
                        <i onClick={this.handleSlideToggle} color="disabled" className='material-icons' style={{ fontSize: '1.5em' }}>search</i>
                        <input onChange={this.handleSearch} value={this.state.searchValue} className={this.state.displayClass} type="text" />
                        {this.state.searchValue && this.state.searchResults.length > 0 &&
                            <div>
                                {this.state.searchResults.map((e, i) => {
                                    return (
                                        <p onClick={() => this.handleSearchedCountry(e)} key={i}>{e.properties.name}</p>
                                    )
                                })}
                            </div>
                        }

                    </div>
                    <div className="iconDiv">
                        <div className="iconContianer">

                            <i onClick={this.handleSlideToggle} className='material-icons' color="action" style={{ fontSize: '1.5em' }}>explore</i>
                        </div>
                        <select onClick={this.handleClearSearch} onChange={this.handleSearchedContinent} value={this.state.continent} className={this.state.displayClass}>
                            <option value="" disabled selected>Browse By Continent</option>
                            <option value="Earth">Earth View</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Europe">Europe</option>
                            <option value="N. America">N. America</option>
                            <option value="S. America">S. America</option>
                        </select>
                    </div>
                    <div className="iconDiv">
                        <div className="iconContianer">

                            <i onClick={this.handleSlideToggle} color="action" className='material-icons' style={{ fontSize: '1.5em' }} >person_pin</i>
                        </div>
                    </div>
                    <div className="iconDiv">
                        <i onClick={this.getFriendsList} color="action" className='material-icons' style={{ fontSize: '1.5em' }} >people</i>
                    </div>
                    <div className="iconDiv">
                        <i onClick={this.handleSlideToggle} color="action" className='material-icons' style={{ fontSize: '1.5em' }} >work</i>
                    </div>
                    <div className="iconDiv">
                        <i onClick={this.handleSlideToggle} color="action" className='material-icons' style={{ fontSize: '1.5em' }} >favorite</i>
                    </div>
                </div>
                <div id="empty"></div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        loggedIn: reduxState.auth.loggedIn,
        username: reduxState.auth.username,
        userId: reduxState.auth.userId,
        geojson: reduxState.map.geojson,
        visitedList: reduxState.user.visitedList,
        friendsList: reduxState.user.friendsList
    }
}

export default connect(mapStateToProps, { openProfile, toggleFriendsCountries, requestUserPosts, updateVisitedGeojson, logoutUser, updateBounds, searchMap, exitSearch, resetPost, resetUser, requestFriendsList })(Sidebar);
