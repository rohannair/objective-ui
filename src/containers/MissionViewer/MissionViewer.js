import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';
import styles from './MissionViewer.css';

// Actions
import {
  getMissionList,
  newMission
} from '../../state/actions/missions.actions';

class MissionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

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
    const { missionList } = this.props;
    const { collapsed } = this.state;

    if (missionList.size === 0) {
      return <div>Loading...</div>
    }

    const MissionCards = missionList.map(mission => {
      const user = mission.users.length > 0
      ? mission.users[0]
      : {
        firstName: '',
        lastName: '',
        role: null
      };

      const userimg = user.img || `//placehold.it/250x250/${((1<<24)*Math.random()|0).toString(16)}`;

      return (
        <div key={ mission.id } className={ styles.missionCard }>
          <Card>
            <div className={ styles.header }>
              <div className={ styles.avatar }>
                <img src={ userimg } />
              </div>
              <div className={ styles.profileDetails }>
                <h4>{`${user.firstName} ${user.lastName}`}</h4>
                <h5>{ mission.name} - {mission.duration}</h5>
              </div>
            </div>

            <div className={ styles.body }>
              <div className={ styles.section }>
                <h4>Description</h4>
                <p>{ mission.description }</p>
              </div>

              <div className={ styles.section }>
                <h4>Duration</h4>
                <p>{ mission.duration }</p>
              </div>

              <div className={ styles.section }>
                <h4>Objectives and Key Results</h4>
                <ul>
                  { mission.targets.map(o =>
                    <li key={o.id} className={ styles.target }>
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
            </div>
            <div className={ styles.footer }>
              <Link to={`/missions/edit/${mission.id}`}>
                <Button primary onClick={() => {}}>Edit
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )
    });

    return (
      <div className={styles.missionViewer}>
        <div className={styles.controlBar}>
          <Button primary onClick={ this._addNewMission }>New Mission</Button>
        </div>
        { MissionCards }
      </div>
    );
  };

  _addNewMission = (e) => {
    e.preventDefault();
    this.props.dispatch(newMission());
  };
}

const mapStateToProps = state => ({
  missionList: state.get('missionList')
});

export default connect(mapStateToProps)(MissionView);
