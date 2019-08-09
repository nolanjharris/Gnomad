/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import logo from '../../logo.png';
import unitedStates from '../../unitedStates';
import './Sidebar.scss';
import { logoutUser } from '../../redux/reducers/authReducer';
import { resetPost } from '../../redux/reducers/postReducer';
import { resetUser, openProfile, requestUserPosts } from '../../redux/reducers/userReducer';
import { searchMap, updateBounds, exitSearch, updateVisitedGeojson } from '../../redux/reducers/mapReducer';
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
            searchValue: ''
        }
    }
    handleLogout = () => {
        this.props.logoutUser();
        this.props.resetPost();
        this.props.resetUser();
    }

    handleSearch = (e) => {
        let results = this.props.geojson.features.filter(country => country.properties.name.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log(results);
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
                        <Icon onClick={this.handleSlideToggle} color="disabled" style={{ fontSize: '1.5em' }}>search</Icon>
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

                            <Icon onClick={this.handleSlideToggle} color="action" style={{ fontSize: '1.5em' }}>explore</Icon>
                        </div>
                        <select className={this.state.displayClass}>
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

                            <Icon onClick={this.handleSlideToggle} color="action" style={{ fontSize: '1.5em' }} >person_pin</Icon>
                        </div>
                    </div>
                    <div className="iconDiv">
                        <Icon onClick={this.handleSlideToggle} color="action" style={{ fontSize: '1.5em' }} >people</Icon>
                    </div>
                    <div className="iconDiv">
                        <Icon onClick={this.handleSlideToggle} color="action" style={{ fontSize: '1.5em' }} >work</Icon>
                    </div>
                    <div className="iconDiv">
                        <Icon onClick={this.handleSlideToggle} color="action" style={{ fontSize: '1.5em' }} >favorite</Icon>
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
        visitedList: reduxState.user.visitedList
    }
}

export default connect(mapStateToProps, { openProfile, requestUserPosts, updateVisitedGeojson, logoutUser, updateBounds, searchMap, exitSearch, resetPost, resetUser })(Sidebar);
