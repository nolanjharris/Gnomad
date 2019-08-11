import React, { Component } from 'react';
import './Legend.scss';
import { connect } from 'react-redux';

class Legend extends Component {

    render() {
        return (
            <div id="mapLegend">
                <div id="legendTabs">
                    <button className="focused">Friends</button>
                    <button>Find</button>
                </div>
                <div id="legendContainer">

                    {this.props.username &&
                        <div>
                            <div className="legendFriend" style={{ backgroundColor: `${this.props.userColor}` }} >
                            </div>
                            <p style={{ color: 'rgb(35, 35, 35)' }}>&{this.props.username}</p>
                        </div>
                    }
                    {this.props.friendsList.map((friend, i) => {
                        return (
                            <div>
                                <div className="legendFriend" style={{ backgroundColor: `${friend.country_color}` }} >
                                </div>
                                <p>&{friend.username}</p>
                            </div>
                        )
                    })
                    }
                </div >
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        friendsList: reduxState.user.friendsList,
        allUsers: reduxState.user.allUsers,
        username: reduxState.auth.username,
        userColor: reduxState.auth.userColor
    }
}

export default connect(mapStateToProps)(Legend);


{/* <input onChange={this.handleUsernameSearch} onFocus={() => this.props.requestFriendsList(this.props.userId)} className={this.state.displayClass} type="text" />
                        {this.state.username && this.state.usernameResults.length > 0 &&
                            <div>
                                {this.state.usernameResults.map((e, i) => {
                                    return (
                                        <>
                                            <p key={i}>{e.username}</p>
                                            <button onClick={() => this.handleAddFriend(e)}>Add Friend</button>
                                        </>
                                    )
                                })}
                            </div>
                        } */}