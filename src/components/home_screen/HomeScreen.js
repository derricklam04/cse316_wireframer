import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireFrameLinks from './WireFrameLinks'
import { getFirestore } from 'redux-firestore';


class HomeScreen extends Component {
    handleNewWireFrame = () => {
        let newWireFrameData = {
            name: 'Unnamed wireframe',
            controls: [],
            time: Date.now(),
        }
        const fireStore = getFirestore();
        let newWireFrame = fireStore.collection("wireFrames").doc();
        newWireFrame.set(newWireFrameData);

        this.props.history.push({
            pathname: "wireFrame/" + newWireFrame.id,
            key: newWireFrame.id,
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireFrameLinks 
                        />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            WireFrame<br />
                             Maker
                        </div>
                        <div className="home_new_list_container">
                                <a onClick={this.handleNewWireFrame} className="waves-effect waves-light btn-large grey accent-2 hoverable rounded">
                                    <i className="material-icons right">library_add</i>Create New WireFrame
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireFrames', orderBy: ["time", "desc"]},
    ]),
)(HomeScreen);