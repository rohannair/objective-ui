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
import AddNewCheckIn from './Modals/AddNewCheckIn';
import AddSquadMember from './Modals/AddSquadMember';
import NewObjectiveModal from './Modals/NewObjectiveModal';
import NewSquadModal from './Modals/NewSquadModal';
import NewUserOKRModal from './Modals/NewUserOKRModal';
import ViewCheckIns from './Modals/ViewCheckIns';

import {
  getSquadList,
  newSquadMission,
  addUserToSquad,
  createSquad,
  newUserOKR,
  addCheckIn,
  editSquadObjective
} from '../../state/actions/squadList.actions';

import {
  searchUsers
} from '../../state/actions/userList.actions';

class SquadList extends Component {
  constructor(props) {
    super(props);

    this.defaultObjectiveState = {
      editing: false,
      id: '',
      name: '',
      keyResults: [ { name: '' } ],
      timeline: '',
      squadId: ''
    };

    this.defaultUserOKRState = {
      name: '',
      keyResults: [ '' ],
      resources: [ '' ],
      timeline: '',
      squadId: '',
      userId: ''
    };

    this.defaultSquadState = {
      name: '',
      leader: ''
    };

    this.defaultAssignState = {
      user: '',
      squadId: ''
    };

    this.defaultCheckInState = {
      name: '',
      body: '',
      completed: false,
      objectiveId: '',
      userId: ''
    };

    this.state = {
      objective: this.defaultObjectiveState,
      squad: this.defaultSquadState,
      assign: this.defaultAssignState,
      user: this.defaultUserOKRState,
      checkIn: this.defaultCheckInState,
      openMenu: '',
      checkInUser: ''
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
      const objectiveData = squadItem.objectives
        && squadItem.objectives.length > 0
      ? squadItem.objectives[0]
      : null;

      const members = squadItem.users.map(u =>
        <User
          key={u.id}
          data={u}
          leader={u.id === squadItem.leader}
          onCheckInClick={() => {}}
          onEditClick={this._editUserObjective}
          onNewCheckinClick={this._showCheckInModal}
          onMenuClick={this._toggleUserOKRMenu}
          openMenu={u.id === this.state.openMenu}
          squadId={squadItem.id}
          showOKRModal={this._showNewUserOKRModal}
          viewCheckIn={this._showViewCheckInModal}
        />
        );

      return (
        <div key={squadItem.id} className={styles.listItem}>
          <Card>
            <div className={ styles.header }>
              <h3>{squadItem.name}</h3>

            </div>
            <div className={ styles.body }>
              <Objective
                data={ objectiveData }
                buttonAction={this._showNewObjectiveModal.bind(this, squadItem.id)}
                buttonText='Add Squad Objective'
                editAction={() => {
                  this.setState({
                    objective: {
                      editing: true,
                      id: objectiveData.id,
                      name: objectiveData.name,
                      keyResults: objectiveData.key_results,
                      timeline: objectiveData.timeline,
                      squadId: objectiveData.squadId
                    }
                  }, () => this._showNewObjectiveModal(squadItem.id));
                }}
              />

              { members }
            </div>
            <div className={ styles.footer }>
              <Button
                transparent
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
          <NewSquadModal
            name={this.state.squad.name}
            onChangeName={(name) => {
              this.setState({
                squad: {
                  ...this.state.squad,
                  name
                }
              });
            }}
            onSave={() => {
              const { squad } = this.state;
              const { dispatch } = this.props;

              dispatch(createSquad({ name: squad.name }));
              this.refs.newSquadDialog.hide();
            }}
          />
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="New OKR"
          ref="NewObjectiveModal"
          afterClose={ () => this.setState({ objective: this.defaultObjectiveState }) }
        >
          <NewObjectiveModal
            name={this.state.objective.name}
            onChangeName={name =>
              this.setState({
                objective: {
                  ...this.state.objective,
                  name
                }
              })
            }
            keyResults={this.state.objective.keyResults}
            onChangeKeyResults={(val, i, id) => {
              const { keyResults } = this.state.objective;
              this.setState({
                objective: {
                  ...this.state.objective,
                  keyResults: [
                    ...keyResults.slice(0, i),
                    { name: val, id },
                    ...keyResults.slice(i + 1)
                  ]
                }
              });
            }}
            onAddKeyResult={() => {
              const { keyResults } = this.state.objective;
              this.setState({
                objective: {
                  ...this.state.objective,
                  keyResults: [ ...keyResults, '' ]
                }
              });
            }}
            timeline={this.state.objective.timeline}
            onChangeTimeline={timeline =>
              this.setState({
                objective: {
                  ...this.state.objective,
                  timeline
                }
              })
            }
            onSubmit={this._createOrEditObjective}
          />
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="New OKR"
          ref="newUserOKRDialog"
          afterClose={ () => this.setState({ user: this.defaultUserOKRState }) }
        >
          <NewUserOKRModal
            name={this.state.user.name}
            userId={this.state.user.userId}
            onChangeName={name =>
              this.setState({
                user: {
                  ...this.state.user,
                  name
                }
              })
            }

            keyResults={this.state.user.keyResults}
            onChangeKeyResults={(val, i) => {
              const { keyResults } = this.state.user;
              this.setState({
                user: {
                  ...this.state.user,
                  keyResults: [
                    ...keyResults.slice(0, i),
                    val,
                    ...keyResults.slice(i + 1)
                  ]
                }
              });
            }}
            onAddKeyResult={() => {
              const { keyResults } = this.state.user;
              this.setState({
                user: {
                  ...this.state.user,
                  keyResults: [ ...keyResults, '' ]
                }
              });
            }}

            resources={this.state.user.resources}
            onChangeResources={(val, i) => {
              const { resources } = this.state.user;
              this.setState({
                user: {
                  ...this.state.user,
                  resources: [
                    ...resources.slice(0, i),
                    val,
                    ...resources.slice(i + 1)
                  ]
                }
              });
            }}
            onAddResource={() => {
              const { resources } = this.state.user;
              this.setState({
                user: {
                  ...this.state.user,
                  resources: [ ...resources, '' ]
                }
              });
            }}
            timeline={this.state.user.timeline}
            onChangeTimeline={timeline =>
              this.setState({
                user: {
                  ...this.state.user,
                  timeline
                }
              })
            }
            onSubmit={this._createUserOKR}
          />
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

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="Add Snapshot"
          ref="newCheckInDialog"
          afterClose={ () => this.setState({ checkIn: this.defaultCheckInState })}
        >
          <AddNewCheckIn
            name={this.state.checkIn.name}
            description={this.state.checkIn.body}
            onNameChange={(name) => this.setState({
              checkIn: {
                ...this.state.checkIn,
                name
              }
            })}
            onDescriptionChange={(body) => this.setState({
              checkIn: {
                ...this.state.checkIn,
                body
              }
            })}
            onSubmit={this._addNewCheckin}
           />
        </SkyLight>

        <SkyLight hideOnOverlayClicked dialogStyles={ skylightStyles }
          title="View Check Ins"
          ref="viewCheckInDialog"
          afterClose={ () => this.setState({ checkInData: [] }) }
        >
          <ViewCheckIns
            data={this.state.checkInData}
          />
        </SkyLight>
      </div>
    );
  };

  // Container Methods
  _addNewCheckin = () => {
    const { dispatch } = this.props;
    const { checkIn } = this.state;
    const { name, body, completed, objectiveId, userId } = checkIn;
    if (!name
      || !body
      || !objectiveId
      || !userId) {
      return;
    }

    dispatch(addCheckIn(checkIn));
    this.refs.newCheckInDialog.hide()
  };

  _assignUserToSquad = (userId) => {
    const { squadId } = this.state.squad;
    const { dispatch } = this.props;

    dispatch(addUserToSquad({userId, squadId}));
    this.refs.assignUserDialog.hide();
  };

  _createOrEditObjective = () => {
    const { dispatch } = this.props;
    const { objective: { id, editing, name, keyResults, timeline, squadId } } = this.state;

    const objective = {
      id,
      name,
      timeline,
      squadId,
      keyResults: keyResults.filter(kr => !!kr),
    };

    // TODO: proper validation messaging
    if (!objective.name
        || !objective.keyResults.length > 0
        || !objective.timeline) {
      return console.error('Failed validation');
    }

    this.refs.NewObjectiveModal.hide();

    return editing
      ? dispatch(editSquadObjective(objective))
      : dispatch(newSquadMission(objective));
  };

  _createUserOKR = () => {
    const { dispatch } = this.props;
    const { user: {
      name, keyResults, timeline, squadId, userId, resources
    } } = this.state;

    const objective = {
      name,
      timeline,
      squadId,
      userId,
      keyResults: keyResults.filter(kr => !!kr),
      resources: resources.filter(r => !!r),
    };

    // TODO: proper validation messaging
    if (!objective.name
        || !objective.keyResults.length > 0
        || !objective.timeline) {
      return console.error('Failed validation');
    }
    this.refs.newUserOKRDialog.hide();
    return dispatch(newUserOKR(objective));
  };

  _editUserObjective = () => {
    // TODO: this
    alert('Not implemented yet');
  };

  _searchForUser = (val) => {
    if (val.length < 3) return;

    const { dispatch } = this.props;
    dispatch(searchUsers(val));
  };

  _showCheckInModal = (objectiveId, userId) => {
    this.setState({
      checkIn:{
        ...this.defaultCheckInState,
        objectiveId,
        userId
      }
    }, () => this.refs.newCheckInDialog.show());
  };

  _showAssignUserModal = (id) => {
    this.setState({
      squad: {
        ...this.state.assign,
        squadId: id
      }
    }, () => this.refs.assignUserDialog.show());
  };

  _showNewUserOKRModal = (squadId, userId) => {
    this.setState({
      user: {
        ...this.state.user,
        squadId,
        userId
      }
    }, () => this.refs.newUserOKRDialog.show());
  };

  _showNewSquadModal = (e) => {
    e.preventDefault();
    this.refs.newSquadDialog.show();
  };

  _showNewObjectiveModal = (id) => {
    this.setState({
      objective: {
        ...this.state.objective,
        squadId: id
      }
    });
    this.refs.NewObjectiveModal.show();
  };

  _showViewCheckInModal = (data) => {
    this.setState({
      checkInData: data
    }, () => this.refs.viewCheckInDialog.show());
  };

  _toggleUserOKRMenu = (id) => this.setState({ openMenu: id });

}

const mapStateToProps = state => ({
  squads: state.get('squads'),
  users: state.get('users')
});

export default connect(mapStateToProps)(SquadList);
