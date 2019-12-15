import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireFrameCard from './WireFrameCard';

class WireFrameLinks extends React.Component {
    render() {
        const wireFrames = this.props.wireFrames;
        console.log(wireFrames);
        return (
            <div className="todo-lists section">
                {wireFrames && wireFrames.map((wireFrame) => (

                    <Link to={'/wireFrame/' + wireFrame.id} key={wireFrame.id}>
                        <WireFrameCard 
                            wireFrame={wireFrame}
                        />
                    </Link>
                ))}
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

export default compose(connect(mapStateToProps))(WireFrameLinks);