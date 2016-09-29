import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

// Deps
import Card from 'components/Card';

import styles from './MissionViewer.css';

const MissionView = props =>
  <div className={ styles.missionCard }>
    <div className={ styles.header }>
      <div className={ styles.avatar }>
        <img src="https://avatars.io/twitter/raykanani" />
      </div>
      <div className={ styles.profileDetails }>
        <h4>Ray Kanani</h4>
        <h5>{ props.mission.get('name')} - {props.mission.get('duration')}</h5>
      </div>
    </div>
    <div className={ styles.divider }></div>
    <Card>
      <div className={ styles.section }>
        <h4>Objective</h4>
        <p>{props.mission.get('description')}</p>
      </div>

      <div className={ styles.section }>
        <h4>Objectives and Key Results</h4>
        <ul>
          { props.mission.get('okrs').map(o =>
            <li key={o.get('id')}>
              {o.get('objective')}
              <ul>
                {
                  o.get('keyResults').map((r,i) =>
                    <li key={`${o.get('id')}-${i}`}>{r}</li>)
                }
              </ul>
            </li>)
          }
        </ul>
      </div>

      <div className={ styles.section }>
        <h4>Personal Objectives</h4>
        <ul>
          {
            props.mission.get('objectives').map(o =>
              <li key={o.get('id')}>{o.get('name')}</li>)
          }
        </ul>
      </div>

      <div className={ styles.section }>
        <h4>Resources</h4>
        <ul>
          {
            props.mission.get('resources').map(o =>
              <li key={o.get('id')}>{o.get('name')}</li>)
          }
        </ul>
      </div>
    </Card>
  </div>

const mapStateToProps = state => ({
  mission: state.get('mission')
});

export default connect(mapStateToProps)(MissionView);
