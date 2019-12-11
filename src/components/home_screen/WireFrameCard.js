import React from 'react';
import { Modal, Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';

class WireFrameCard extends React.Component {
    state= {
        currentWireFrame: this.props.wireFrame,
    }

    deleteWireFrame = (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.setState({currentWireFrame: this.props.wireFrame});

        let fireStore = getFirestore();
        fireStore.collection('wireFrames').doc(this.state.currentWireFrame.id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        //this.props.history.goBack();
    }
    doNothing = (e) => {
        e.stopPropagation();
    }
    
    render() {
        const { wireFrame } = this.props;
        const handleClick = this.deleteWireFrame;
        console.log("WireFrameCard, wireFrame.id: " + wireFrame.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3 row">
                        <span className="card-title col m9">{wireFrame.name}</span> 
                        <h4 className="col m3 card-content btn-floating btn-large waves-effect waves-light red accent-2 hoverable modal-trigger"
                                href="#modal1"><i className="material-icons">close</i></h4>
                </div> 
                
                <div className="">
                    <Modal id="modal1" header="Delete List?" actions={
                        <div className="grey lighten-2">
                            <Button className="red accent-2" tooltip="The list will not be retrievable." tooltipOptions={{ position: 'top' }}
                                onClick={handleClick} modal="close">Yes</Button><span>  </span>
                            <Button onClick={this.doNothing} className="purple lighten-2" modal="close">No</Button>
                        </div>}>
                        <p><b>Are you sure you want to delete this list?</b></p>
                    </Modal>
                </div>
            </div>

            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireFrames: state.firestore.ordered.wireFrames,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireFrameCard);