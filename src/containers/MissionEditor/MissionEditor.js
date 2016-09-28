import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Card from 'components/Card';

import styles from './MissionEditor.css';

const MissionEditor = (props) => {

  return (
    <div className={ styles.missionEditor }>
      <h1 className={ styles.header }>
        { `New Mission - ${props.title}` }
      </h1>

      <Card>
        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Mission Name</h2>
        </div>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Mission Objective</h2>
        </div>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Mission Timeline</h2>
        </div>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Objectives and Key Results</h2>
        </div>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Personal Objectives</h2>
        </div>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Key Resources</h2>
        </div>

      </Card>
    </div>
  );
}

MissionEditor.propTypes = {

};

MissionEditor.defaultProps = {
  title: ''
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MissionEditor);
