import React, { Component, PropTypes } from 'react';
import styles from './Feed.css';

import { connect } from 'react-redux';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.Feed}>
        <div className={styles.controlBar}></div>
        <div className={styles.body}>
          <h2>Feed</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Feed);

