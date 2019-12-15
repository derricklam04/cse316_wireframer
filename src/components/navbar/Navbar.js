import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { Link } from 'react-router-dom';

import { compose } from 'redux';


class Navbar extends React.Component {

  render() {
    const { auth, profile } = this.props;
    const loglink = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className=" grey darken-3 nav-wrapper">
        <div className="container">
          <Link to="/" className="left brand-logo">@WireFramer</Link>
          {loglink}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);