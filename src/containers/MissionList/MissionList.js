import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TextInput from '../../components/Forms/TextInput';
import TextArea from '../../components/Forms/TextArea';

import styles from './MissionList.css';

// Actions
import {
  getMissionList,
  newMission
} from '../../state/actions/missions.actions';

class MissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      modalVisible: false,
      modalCIVisible: false,
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

    const getCheckInModal = () => {
      if (this.state.modalVisible) {
        return (
          <Modal closeModal={() => this.setState({ modalVisible: false })}>
            <div className={styles.checkinModal} onClick={e => e.stopPropagation()}>
              Add a Check-In
              <div className={styles.checkinModalForm}>
                Title:
                <TextInput />
              </div>
              <div className={styles.checkinModalForm}>
                Update:
                <TextArea />
              </div>
              <Button primary onClick={e => this.setState({ modalVisible: false })}>Save</Button>
            </div>
          </Modal>
        );
      }
    };

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

      const userimg = user.img || `//placehold.it/250x250/eee?text=\?`;

      return (
        <div key={ mission.id } className={ styles.missionCard }>
          <Card>
            { getCheckInModal() }
            <div className={ styles.header }>
              <img className={ styles.avatar} src={ userimg } />
              <div className={ styles.mission }>
                { mission.name}
                <div className={ styles.endDate }>Ends: { dateFormat(mission.endAt, 'longDate') }</div>
              </div>
            </div>

            <div className={ styles.body }>
              {/*}
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
              {*/}

              <div className={ styles.section }>
                <h4>Updates</h4>
                {
                  mission.checkIns.map( val =>
                    <div key={val.id}><button className={styles.fakeLink} onClick={ (e) => this.setState({ modalCIVisible: true })}>*</button></div>)
                }
                { this._showCheckInModal(missionList.get(1).checkIns[0]) }
              </div>

            </div>
            <div className={ styles.footer }>
              <Link to={`/missions/edit/${mission.id}`}>
                <Button onClick={() => {}}>Edit
                </Button>
              </Link>
                <Button primary onClick={e => this.setState({ modalVisible: true })}>New Check-In
                </Button>
            </div>
          </Card>
        </div>
      )
    });

    return (
      <div className={styles.missionViewer}>
        <div className={styles.controlBar}>
          <div className={styles.macroContainer}>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={ ()=>{} }
            >Analytics</Button>
            &nbsp;&nbsp;
            <Button
              primary
              onClick={ this._addNewMission }
            >New</Button>
          </div>
        </div>
        <div className={styles.cardContainer}>
          { MissionCards }
        </div>
      </div>
    );
  };

  _addNewMission = (e) => {
    e.preventDefault();
    this.props.dispatch(newMission());
  };

  _showCheckInModal = (val) => {
    if (this.state.modalCIVisible) {
      return (
        <Modal closeModal={() => this.setState({modalCIVisible: false})}>
          <div>
            <h2>{ val.name }</h2>
            <p>{ val.body }</p>
          </div>
          <div>
            <Button primary onClick={() => this.setState({modalCIVisible: false})}>Close</Button>
          </div>
        </Modal>
      )
    }
  }
}

const mapStateToProps = state => ({
  missionList: state.get('missionList')
});

export default connect(mapStateToProps)(MissionList);
