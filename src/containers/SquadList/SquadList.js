import React, { Component, PropTypes } from 'react';
import styles from './SquadList.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import { Link } from 'react-router';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';

import Objective from '../../components/Objective';
import User from '../../components/User';

import SkyLight from 'react-skylight';

// Modals
import NewSquadModal from './Modals/NewSquadModal';
import NewMissionModal from './Modals/NewMissionModal';
import AddSquadMember from './Modals/AddSquadMember';

import {
  getSquadList,
  newSquadMission,
  addUserToSquad
} from '../../state/actions/squadList.actions';

import {
  searchUsers
} from '../../state/actions/userList.actions';

class SquadList extends Component {
  constructor(props) {
    super(props);

    this.defaultMissionState = {
      objective: '',
      keyResults: [ '' ],
      timeline: '',
      squadId: ''
    };

    this.defaultSquadState = {
      name: '',
      leader: ''
    };

    this.defaultAssignState = {
      user: '',
      squadId: ''
    };

    this.state = {
      mission: this.defaultMissionState,
      squad: this.defaultSquadState,
      assign: this.defaultAssignState
    };

  }

  componentWillMount() {
    this.props.dispatch(getSquadList());
  }

  render() {
    const { squads } = this.props;
    const skylightStyles = {
      width: '40%',
      height: 'static',
      marginLeft: '-20%',
      marginTop: '0',
      top: '20%',
      padding: '30px'
    };

    const squadList = squads.map(squadItem => {
      const objective = squadItem.objectives && squadItem.objectives.length > 0
      ? <Objective data={squadItem.objectives[0]} />
      : <Button transparent onClick={this._showNewMissionModal.bind(this, squadItem.id)}>Add Squad Objective</Button>;
      const members = squadItem.users.map(u =>
        <User key={u.id} data={u} leader={u.id === squadItem.leader} />
        );

      return (
        <div key={squadItem.id} className={styles.listItem}>
          <Card>
            <div className={ styles.header }>
              <h3>{squadItem.name}</h3>
            </div>
            <div className={ styles.body }>
              { objective }
              { members }
            </div>
            <div className={ styles.footer }>
              <Button
                primary
                onClick={this._showAssignUserModal.bind(this, squadItem.id)}
              >
                + Add Squad Member
              </Button>
            </div>
          </Card>
        </div>
      );
    });

    return (
      <div className={styles.SquadList}>
        <div className={styles.controlBar}>
          <h2>Squads</h2>

          <div className={styles.buttonContainer}>
            &nbsp;&nbsp;
            <Button
              primary
              onClick={ this._showNewSquadModal }
            >New Squad</Button>
          </div>
        </div>

        <div className={styles.cardContainer}>
          { squadList }
        </div>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="New Squad"
          ref="newSquadDialog"
          afterClose={ () => this.setState({ squad: this.defaultSquadState }) }
        >
          <NewSquadModal />
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="New OKR"
          ref="newMissionDialog"
          afterClose={ () => this.setState({ mission: this.defaultMissionState }) }
        >
          <NewMissionModal />
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="Add Squad Member"
          ref="assignUserDialog"
          afterClose={ () => this.setState({ mission: this.defaultAssignState }) }
        >
          <AddSquadMember
            users={this.props.users}
            onType={this._searchForUser}
            onEnter={this._assignUserToSquad}
          />
        </SkyLight>
      </div>
    );
  };

  _showAssignUserModal = (id) => {
    this.setState({
      squad: {
        ...this.state.assign,
        squadId: id
      }
    });
    this.refs.assignUserDialog.show();
  };

  _showNewSquadModal = (e) => {
    e.preventDefault();
    this.refs.newSquadDialog.show();
  };

  _showNewMissionModal = (id) => {
    this.setState({
      mission: {
        ...this.state.mission,
        squadId: id
      }
    });
    this.refs.newMissionDialog.show();
  };

  _createMission = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { dispatch } = this.props;
    const { mission: { objective, keyResults, timeline, squadId } } = this.state;

    const mission = {
      objective,
      timeline,
      squadId,
      keyResults: keyResults.filter(kr => !!kr),
    };

    // TODO: proper validation messaging
    if (!mission.objective
        || !mission.keyResults.length > 0
        || !mission.timeline) {
      return console.error('Failed validation');
    }

    return dispatch(newSquadMission(mission));
  };

  _searchForUser = (val) => {
    if (val.length < 3) return;

    const { dispatch } = this.props;
    dispatch(searchUsers(val));
  };

  _assignUserToSquad = (userId) => {
    const { squadId } = this.state.squad;
    const { dispatch } = this.props;

    dispatch(addUserToSquad({userId, squadId}));
    this.refs.assignUserDialog.hide();
  }
}

const mapStateToProps = state => ({
  squads: state.get('squads'),
  users: state.get('users')
});

export default connect(mapStateToProps)(SquadList);
