import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

const MissionView = props =>
  <div>
    <h1>{ props.mission.get('name')}</h1>
    <h2>Objective</h2>
    <p>{props.mission.get('description')}</p>

    <h2>Duration</h2>
    <p>{props.mission.get('duration')}</p>

    <h2>Objectives and Key Results</h2>
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

    <h2>Personal Objectives</h2>
    <ul>
      {
        props.mission.get('objectives').map(o =>
          <li key={o.get('id')}>{o.get('name')}</li>)
      }
    </ul>

    <h2>Resources</h2>
    <ul>
      {
        props.mission.get('resources').map(o =>
          <li key={o.get('id')}>{o.get('name')}</li>)
      }
    </ul>
  </div>

const mapStateToProps = state => ({
  mission: state.get('mission')
});

export default connect(mapStateToProps)(MissionView);
