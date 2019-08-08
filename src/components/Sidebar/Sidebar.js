/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Sidebar.scss';
import { logoutUser } from '../../redux/reducers/authReducer';
import { resetPost } from '../../redux/reducers/postReducer';
import { resetUser } from '../../redux/reducers/userReducer';
import { searchMap, updateBounds } from '../../redux/reducers/mapReducer';
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
    handleLogout() {
        this.props.logoutUser();
        this.props.resetPost();
        this.props.resetUser();
    }

    handleSearch = (e) => {
        let results = this.props.geojson.features.filter(country => country.properties.name.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log(results);
        this.setState({ searchResults: results, searchValue: e.target.value })
    }

    handleSearchedCountry = (country) => {
        this.props.searchMap();
        this.props.updateBounds(country);
        this.setState({ searchResults: [], searchValue: '' })
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
            <div className="sidebar" onMouseEnter={this.handleSlideToggle} onMouseLeave={this.handleSlideToggle}>
                <div id="sideBarTitle">
                    <h1>G<span className={this.state.displayClass}>NOMAD</span></h1>
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
                            <a href="#" onClick={this.handleLogout}>logout</a>
                        </div>
                    }
                </div>
                <div className="menuItems">
                    <div className="iconDiv">
                        <Icon color="disabled" style={{ fontSize: '2.5em' }}>search</Icon>
                        <input onChange={this.handleSearch} value={this.state.searchValue} className={this.state.displayClass} type="text" />
                        {this.state.searchResults.length > 0 &&
                            <div>
                                {this.state.searchResults.map((e, i) => {
                                    return (
                                        <p onClick={() => this.handleSearchedCountry(e)} key={i}>{e.properties.name}</p>
                                    )
                                })}
                            </div>
                        }
                        <button className={this.state.displayClass}><Icon>location_searching</Icon></button>
                    </div>
                    <div className="iconDiv">
                        <Icon color="action" style={{ fontSize: '2.5em' }}>explore</Icon>
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
                        <Icon color="action" style={{ fontSize: '2.5em' }} >person_pin</Icon>
                    </div>
                    <div className="iconDiv">
                        <Icon color="action" style={{ fontSize: '2.5em' }} >people</Icon>
                    </div>
                    <div className="iconDiv">
                        <Icon color="action" style={{ fontSize: '2.5em' }} >work</Icon>
                    </div>
                    <div className="iconDiv">
                        <Icon color="action" style={{ fontSize: '2.5em' }} >favorite</Icon>
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
        geojson: reduxState.map.geojson
    }
}

export default connect(mapStateToProps, { logoutUser, updateBounds, searchMap, resetPost, resetUser })(Sidebar);
// import React, { Component } from 'react';
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import './Sidebar.scss';
// import Icon from '@material-ui/core/Icon';

// export default class SideBar extends Component {

//     render() {
//         return (
//             <SideNav id="sideNav"
//                 onSelect={(selected) => {
//                     // Add your code here
//                 }}
//             >

//                 <SideNav.Toggle id="toggle" />
//                 <SideNav.Nav>
//                     <NavItem eventKey="home">
//                         <NavIcon>
//                             <Icon id="icon">home</Icon>
//                         </NavIcon>
//                         <NavText className="navText">
//                             Home
//                         </NavText>
//                     </NavItem>
//                     <NavItem eventKey="charts">
//                         <NavIcon>
//                             <Icon id="icon">explore</Icon>
//                         </NavIcon>
//                         <NavText className="navText">
//                             Explore By Continent
//                         </NavText>
//                         <NavItem eventKey="charts/linechart">
//                             <NavText className="navText">
//                                 <select>
//                                     <option value="Africa">Africa</option>
//                                     <option value="Asia">Asia</option>
//                                     <option value="Australia">Australia</option>
//                                     <option value="Europe">Europe</option>
//                                     <option value="N. America">N. America</option>
//                                     <option value="S. America">S. America</option>
//                                 </select>
//                             </NavText>
//                         </NavItem>
//                     </NavItem>
//                     <NavItem eventKey="charts">
//                         <NavIcon>
//                             <Icon id="icon">search</Icon>
//                         </NavIcon>
//                         <NavText className="navText">
//                             Search
//                         </NavText>
//                         <NavItem eventKey="charts/linechart">
//                             <NavText className="navText">
//                                 <input autoComplete="off" id="search" type="text" />
//                             </NavText>
//                         </NavItem>
//                     </NavItem>
//                     <NavItem eventKey="home">
//                         <NavIcon>
//                             <Icon id="icon">people</Icon>
//                         </NavIcon>
//                         <NavText className="navText">
//                             Find Friends
//                         </NavText>
//                     </NavItem>
//                 </SideNav.Nav>
//             </SideNav>
//         )
//     }
// }
