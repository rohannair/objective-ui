import React, { Component, PropTypes } from 'react';
import styles from './Squads.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

class Squads extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Squads">
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Squads);

