import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Deps
import Card from '../../components/Card';
import styles from './MissionViewer.css';

// Actions
import {
  getMissionList
} from '../../state/actions/missions.actions';


class MissionView extends Component {

  static propTypes = {
    missionList: PropTypes.instanceOf(Immutable.List)
  }

  static defaultProps = {
    missionList: new Immutable.List()
  }

  componentWillMount() {
    this.props.dispatch(getMissionList({
      limit: 10,
      offset: 0
    }));
  }

  render() {
    const { props } = this;
    const { missionList } = props;

    if (missionList.size === 0) {
      return <div>Loading...</div>
    }

    const MissionCards = missionList.map(mission => {
      const user = mission.users && mission.users[0];
      return (
        <div key={ mission.id } className={ styles.missionCard }>
          <div className={ styles.header }>
            <div className={ styles.avatar }>
              <img src="https://avatars.io/twitter/raykanani" />
            </div>
            <div className={ styles.profileDetails }>
              <h4>{`${user.firstName} ${user.lastName}`}</h4>
              <h5>{ mission.name} - {mission.duration}</h5>
            </div>
          </div>
          <div className={ styles.divider }></div>

          <Card>
            <div className={ styles.section }>
              <h4>Description</h4>
              <p>{mission.description}</p>
            </div>

            <div className={ styles.section }>
              <h4>Objectives and Key Results</h4>
              <ul>
                { mission.targets.map(o =>
                  <li key={o.id}>
                    {o.objective}
                    <ul>
                      {
                        o.keyResults.map((r,i) =>
                          <li key={`${o.id}-${i}`}>{r}</li>)
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
                  mission.objectives.map(o =>
                    <li key={o.id}>{o.name}</li>)
                }
              </ul>
            </div>

            <div className={ styles.section }>
              <h4>Resources</h4>
              <ul>
                {
                  mission.resources.map(o =>
                    <li key={o.id}>{o.name}</li>)
                }
              </ul>
            </div>
          </Card>

          <div className={ styles.header }>
            <Link to={`/missions/edit/${mission.id}`}>Edit</Link>
          </div>
        </div>
      )
    });

    return (
      <div>
        { MissionCards }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  missionList: state.get('missionList')
});

export default connect(mapStateToProps)(MissionView);
