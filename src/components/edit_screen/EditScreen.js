import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {CompactPicker} from 'react-color';
import ControlCard from './ControlCard';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-materialize';


class EditScreen extends Component {
    state = {
        name: '',
        controls: [],
        selectedControl:{
            controlType: 'unselected',
            height: 0,
            width: 0,
            x: 0,
            y: 0,
            text: '',
            text_size: 0,
            background: '',
            text_color: '',
            border_color: '',
            border_thickness: 0,
            border_radius: 0,
        },
        saved: false,
        canvasHeight: 575,
        canvasWidth: 550,
        tempCanvasHeight: 575,
        tempCanvasWidth: 550,
        disableSubmit: true,
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
    addContainer = (e) => {
        let container = {
            controlType: 'container',
            height: 80,
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
    }
    addPrompt = (e) => {
        let prompt = {
            controlType: 'prompt',
            height: 30,
            width: 120,
            x: 0,
            y: 0,
            text: 'Prompt for Input',
            text_size: 16,
            background: '',
            text_color: 'black',
            border_color: '',
            border_thickness: 0,
            border_radius: 0,
        }
        this.setState({controls: [...this.state.controls, prompt]});
    }
    addButton = (e) => {
        let button = {
            controlType: 'button',
            height: 30,
            width: 60,
            x: 0,
            y: 0,
            text: 'Submit',
            text_size: 16,
            background: '#CCCCCC',
            text_color: 'black',
            border_color: 'black',
            border_thickness: 1,
            border_radius: 1,
        }
        this.setState({controls: [...this.state.controls, button]});

    }
    addTextfield = (e) => {
        let textfield = {
            controlType: 'textfield',
            height: 25,
            width: 100,
            x: 0,
            y: 0,
            text: 'input',
            text_size: 16,
            background: 'white',
            text_color: 'black',
            border_color: 'black',
            border_thickness: 1,
            border_radius: 1,
        }
        this.setState({controls: [...this.state.controls, textfield]});
    }
    select = (control, e) => {
        e.stopPropagation()
        this.setState({selectedControl: control})
    }
    unselect = (e)=>{
        const unselectControl ={
            controlType: 'unselected',
            height: 0,
            width: 0,
            x: 0,
            y: 0,
            text: '',
            text_size: 0,
            background: '',
            text_color: '',
            border_color: '',
            border_thickness: 0,
            border_radius: 0,
        }
        this.setState({selectedControl: unselectControl})
    }

    changeInput = (e) =>{
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].text = e.target.value;
            this.setState({controls: tempControl});
        }
        
    }
    changeTextSize = (e) =>{
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].text_size = Number(e.target.value);
            this.setState({controls: tempControl});
        }
    }
    changeBackground = (color, e) => {
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].background = color.hex;
            this.setState({controls: tempControl});
        }
    }
    changeTextColor = (color, e) => {
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].text_color = color.hex;
            this.setState({controls: tempControl});
        }
    }
    changeBorderColor = (color, e) => {
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].border_color = color.hex;
            this.setState({controls: tempControl});
        }
    }
    changeThickness = (e) => {
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].border_thickness = Number(e.target.value);
            this.setState({controls: tempControl});
        }
    }
    changeRadius = (e) => {
        if (this.state.selectedControl.controlType !== 'unselected'){
            const id = this.state.selectedControl.id;
            const tempControl = this.state.controls.slice();
            tempControl[id].border_radius = Number(e.target.value);
            this.setState({controls: tempControl});
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }
    handleKeyPress = (event) => {
        if (event.keyCode ===  46){
            event.preventDefault();
            event.stopPropagation();
            console.log('You pressed Delete')
            
                const unselected={
                        controlType: 'unselected',
                        height: 0,
                        width: 0,
                        x: 0,
                        y: 0,
                        text: '',
                        text_size: 0,
                        background: '',
                        text_color: '',
                        border_color: '',
                        border_thickness: 0,
                        border_radius: 0,
                    
                }
                var id = this.state.selectedControl.id;
                this.setState({controls: this.state.controls.filter((_,i)=>i!=id)})
                this.setState({selectedControl: unselected})
            
        }
        else if ( event.keyCode === 68 && event.ctrlKey ){
            event.preventDefault();
            event.stopPropagation();
            console.log('You pressed ctrl+D')

            if (this.state.selectedControl.controlType !== 'unselected'){
                const copy = JSON.parse(JSON.stringify(this.state.selectedControl))
                this.setState({controls: [...this.state.controls, copy]});
            }
        }
    }

    saveWireframe = () =>{
        console.log("Wireframe saved!")
        let fireStore = getFirestore();
        fireStore.collection("wireFrames").doc(this.props.wireFrame.id).update({ controls: this.state.controls });
        fireStore.collection("wireFrames").doc(this.props.wireFrame.id).update({ wireframeHeight: this.state.canvasHeight });
        fireStore.collection("wireFrames").doc(this.props.wireFrame.id).update({ wireframeWidth: this.state.canvasWidth });


        this.setState({saved: true})
    }
    renderSaved = ()=> {
        if (this.state.saved){
            return <Link to='/' className='col m4 waves-effect waves-light black-text red lighten-3 accent-2 hoverable rounded'>close</Link> 
        }
        else{
            return <div>
            <span className='col m4 waves-effect waves-light black-text red lighten-3 accent-2 hoverable rounded modal-trigger' href="#modal2">close</span> 
            <Modal id="modal2" header="Closing Wireframe..." actions={
                <div className="orange lighten-2">
                    <Link to='/' className='red btn'>YES</Link> 
                    <Button className="grey darken-1" modal="close">NO</Button>
                </div>}>
                <p><b>Are you sure you want to close this wireframe without saving?</b></p>
            </Modal>
            </div>
        }
    }
    loadWireframe= ()=>{
        this.setState({controls: this.props.wireFrame.controls })
        this.setState({canvasWidth: this.props.wireFrame.wireframeWidth})
        this.setState({canvasHeight: this.props.wireFrame.wireframeHeight})
        this.setState({tempCanvasWidth: this.props.wireFrame.wireframeWidth})
        this.setState({tempCanvasHeight: this.props.wireFrame.wireframeHeight})

    }
    
    changeHeight = (e) => {
        if (e.target.value < 5000 && e.target.value>0){
            this.setState({tempCanvasHeight: Number(e.target.value)});
            this.setState({disableSubmit: false});}

    }
    changeWidth = (e) => {
        if (e.target.value < 5000 && e.target.value>0){
            this.setState({tempCanvasWidth: Number(e.target.value)});
            this.setState({disableSubmit: false});}

    }
    
    submitDimension =(e) =>{
        this.setState({canvasHeight: this.state.tempCanvasHeight});
        this.setState({canvasWidth: this.state.tempCanvasWidth});
        this.setState({disableSubmit: true});
    }

    setPos =()=>{
        console.log("Drag Stopped")
    }

    render() {
        const auth = this.props.auth;
        const wireFrame = this.props.wireFrame;
        const selectedControl = this.state.selectedControl;
        const canvasStyle ={
            container:{
                height: this.state.canvasHeight,
                width: this.state.canvasWidth,
            }
        };

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!wireFrame)
        return <React.Fragment />

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
            this.loadWireframe();
        }

        return (
            <div className='row'>
                
                <div className="controls grey lighten-2 col m2 border" onClick={this.unselect}>
                    <div className='row'>
                        <i className="material-icons col m2">zoom_in</i>
                        <i className="material-icons col m2">zoom_out</i>
                        <div className='col m4 waves-effect waves-light grey lighten-3 accent-2 hoverable rounded modal-trigger' 
                            href="#modal3" onClick={this.saveWireframe}>save</div>
                        <Modal id="modal3" header="Wireframe [SAVED]" actions={
                            <div className="green  lighten-2">
                                <Button className="grey darken-1" modal="close">Close</Button>
                            </div>}>
                        </Modal>
                        {this.renderSaved()}
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


                <div className="white col m7 row" onClick={this.unselect}>
                    <h5 className="grey-text text-darken-3 col m3">Wireframe:</h5>
                    <div className="input-field col m9">
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={wireFrame.name} />
                    </div>
                    <div  className="canvas" style={canvasStyle.container} >
                        <ControlCard
                            controls = {this.state.controls}
                            select={this.select}
                            setPos = {this.setPos}
                        />
                    </div>
                    <div className="row">
                        <h5 className="col m2">Height:</h5>
                        <input className="col m2"type="number" value={this.state.tempCanvasHeight} onChange={this.changeHeight}></input>
                        <h5 className="col m2">Width:</h5>
                        <input className="col m2" type="number" value={this.state.tempCanvasWidth}onChange={this.changeWidth}></input>
                        <div className="col m1"></div>
                        <Button className="col m2" onClick={this.submitDimension} disabled={this.state.disableSubmit}>Submit</Button>
                        <div className="col m1"></div>

                    </div>
                </div>


                <div className ="properties grey lighten-2 col m3 border">
                    <h5>Properties</h5>
                    <input className="active white textbox col s12" type="text" name="text" placeholder="Control Text"
                         onChange={this.changeInput} value={selectedControl.text}/>

                    <div className="container font-size row">
                        <h6 className="col m7">Font size:</h6>
                        <input className="white col m5" type='number' value={selectedControl.text_size}
                            onChange={this.changeTextSize}/>
                    </div>
                    <div className="color">
                        <h6 className="background-color">Background:</h6>
                        <CompactPicker color={selectedControl.background} onChange={this.changeBackground}/>
                        <h6 className="text-color">Text Color:</h6>
                        <CompactPicker color={selectedControl.text_color} onChange={this.changeTextColor}/>
                        <h6 className="border-color">Border Color:</h6>
                        <CompactPicker color={selectedControl.border_color} onChange={this.changeBorderColor}/>
                    </div>
                    <div className="container border-thickness row">
                        <p></p>
                        <h6 className="col m7">Border Thickness:</h6>
                        <input className="white col m5" type="number" onChange={this.changeThickness} value={selectedControl.border_thickness}/>
                    </div>
                    <div className="container border-radius row">
                        <h6 className="col m7">Border Radius:</h6>
                        <input className="white col m5" type="number" onChange={this.changeRadius} value={selectedControl.border_radius}/>
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