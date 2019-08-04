import React, { Component } from 'react';

class CustomPopup extends Component {

    handleClick = () => {
        alert('You clicked it bruh!')
    }
    render() {
        return (
            <div id="popup-div">
                <p>You clicked on {this.props.countryName}</p>
                <button onClick={this.handleClick}>WOOHOOOOO!</button>
            </div>
        )
    }
}

export default CustomPopup;