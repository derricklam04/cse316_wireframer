import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {CompactPicker} from 'react-color';
import ControlCard from './ControlCard';

class EditScreen extends Component {
    state = {
        name: '',
        controls: [],
        selectedControl: ''
    }
    changedTime = false;

    updateTime = () => {
        console.log("updating time")
        let fireStore = getFirestore();
        fireStore.collection('wireFrames').doc(this.props.wireFrame.id).update({ time: Date.now() })
    }


    handleChange = (e) => {
        const { target } = e;
        console.log(e)
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        const fireStore = getFirestore();
        let dbitem = fireStore.collection('wireFrames').doc(this.props.wireFrame.id);
        dbitem.update({ [target.id]: target.value });
    }

    updateFireStore = (e) =>{
        const fireStore = getFirestore();
        let dbitem = fireStore.collection('wireFrames').doc(this.props.wireFrame.id);
        dbitem.update({ controls: [...this.props.wireFrame.controls, e]});
    }

    addContainer = (e) => {
        let container = {
            controlType: 'container',
            height: 50,
            width: 100,
            x: 0,
            y: 0,
            text: '',
            text_size: 0,
            background: 'white',
            text_color: '',
            border_color: 'black',
            border_thickness: 1,
            border_radius: 1,
        }
        this.setState({controls: [...this.state.controls, container]});
        this.updateFireStore(container);
    }
    addPrompt = (e) => {
        let prompt = {
            controlType: 'prompt',
            height: 20,
            width: 40,
            x: 0,
            y: 0,
            text: 'Prompt for Input',
            text_size: 12,
            background: '',
            text_color: 'black',
            border_color: '',
            border_thickness: 0,
            border_radius: 0,
        }
        this.setState({controls: [...this.state.controls, prompt]});
        this.updateFireStore(prompt);
    }
    addButton = (e) => {
        let button = {
            controlType: 'button',
            height: 20,
            width: 40,
            x: 0,
            y: 0,
            text: 'Submit',
            text_size: 12,
            background: 'grey',
            text_color: 'black',
            border_color: 'black',
            border_thickness: 1,
            border_radius: 1,
        }
        this.setState({controls: [...this.state.controls, button]});
        this.updateFireStore(button);

    }
    addTextfield = (e) => {
        let textfield = {
            controlType: 'textfield',
            height: 20,
            width: 60,
            x: 0,
            y: 0,
            text: 'input',
            text_size: 12,
            background: 'white',
            text_color: 'black',
            border_color: 'black',
            border_thickness: 1,
            border_radius: 1,
        }
        this.setState({controls: [...this.state.controls, textfield]});
        this.updateFireStore(textfield);
    }
    select = (control) => {
        this.setState({selectedControl: control})
    }
    unselect = (e)=>{
        //e.stopPropagation();
        //this.setState({selectedControl: 'a'})
    }

    changeInput = (e) =>{
        this.state.selectedControl.text = e.target.value;
        console.log(this.state.selectedControl.text);

        console.log("ON SUBMIT");
        let controls = JSON.parse(JSON.stringify(this.props.wireFrame.controls));
        let pos = this.state.selectedControl.id;
        controls[pos] = this.state.selectedControl;
        console.log(controls);
        let fireStore = getFirestore();
        fireStore.collection("wireFrames").doc(this.props.wireFrame.id).update({ controls: controls });
        //this.goBack();

    }


    render() {
        const auth = this.props.auth;
        const wireFrame = this.props.wireFrame;
        const selectedControl = this.state.selectedControl;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!wireFrame)
        return <React.Fragment />

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <div className='row'>
                <div className="controls grey lighten-2 col m2">
                    <div className='row'>
                        <i className="material-icons col m2">zoom_in</i>
                        <i className="material-icons col m2">zoom_out</i>
                        <div className='col m4'>save</div>
                        <div className='col m4'>close</div> 
                    </div> 
                    <div className="divider black"></div>
                    <div>
                        <div className="Container section center-align">
                            <a className="border container-prop active" name='controls'id="controls"onClick={this.addContainer}></a>
                            <h6 className=""><b>Container</b></h6>
                        </div>
                        <div className="Label section center-align">
                            <div className="prompt " onClick={this.addPrompt}>Prompt for Input</div>
                            <h6 className=""><b>Label</b></h6>
                        </div>
                        <div className="Button section center-align">
                            <div className="button-prop grey lighten-1 border" onClick={this.addButton}>Submit</div>
                            <h6 className=""><b>Button</b></h6>
                        </div>
                        <div className="Textfield section center-align">
                            <div className="textfield-prop white grey-text border"onClick={this.addTextfield}>input</div>
                            <h6 className=""><b>Textfield</b></h6>
                        </div>
                    </div>
                </div>


                <div className="white col m7 row">
                    <h5 className="grey-text text-darken-3 col m4">Wireframe:</h5>
                    <div className="input-field col m8">
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={wireFrame.name} />
                    </div>
                    <div className="canvas" onClick={this.unselect}>
                        <ControlCard
                            controls = {wireFrame.controls}
                            select={this.select}
                        />
                    </div>
                </div>


                <div className ="properties grey lighten-2 col m3">
                    <h5>Properties</h5>
                    <input className="active white textbox col s12" type="text" name="textbox" placeholder="Control Text"
                         onChange={this.changeInput} value={selectedControl.text}/>

                    <div className="container font-size row">
                        <h7 className="col m6">Font size:</h7>
                        <input className="white col m6" type='number' value={selectedControl.text_size}/>
                    </div>
                    <div className="color">
                        <h7 className="background-color">Background:</h7>
                        <CompactPicker/>
                        <h7 className="text-color">Text Color:</h7>
                        <CompactPicker/>
                        <h7 className="border-color">Border Color:</h7>
                        <CompactPicker/>
                    </div>
                    <div className="container border-thickness row">
                        <p></p>
                        <h7 className="col m6">Border Thickness:</h7>
                        <input className="white col m6" />
                    </div>
                    <div className="container border-radius row">
                        <h7 className="col m6">Border Radius:</h7>
                        <input className="white col m6"/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireFrames } = state.firestore.data;
  const wireFrame = wireFrames ? wireFrames[id] : null;
  if (wireFrame){
    wireFrame.id = id;
  }

  return {
    wireFrame,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireFrames' },
  ]),
)(EditScreen);