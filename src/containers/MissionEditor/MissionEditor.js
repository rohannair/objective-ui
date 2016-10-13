import React, { Component, PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { partial } from 'ramda';
import debounce from 'lodash/debounce';

// Deps
import Button from '../../components/Button';
import Card from '../../components/Card';
import TextInput from '../../components/Forms/TextInput';
import TextArea from '../../components/Forms/TextArea';
import Modal from '../../components/Modal';

// Actions
import {
  addField,
  updateField,
  getMission
} from '../../state/actions/missions.actions';

import styles from './MissionEditor.css';

const Section = ({ children, name }) =>
  <div className={ styles.section }>
    <h2 className={ styles.sectionHeader }>{name}</h2>
    { children }
  </div>;

const TextSection = (struct, dispatch, key) =>
  <Section name={`${key.charAt(0).toUpperCase() + key.slice(1)}`}>
    <div className={ styles.sectionBody }>
      <TextInput
        placeholder = "Please type here"
        value = { struct.get(key) }
        onChange = {e => {
          e.stopPropagation();
          dispatch(updateField(struct.get('id'), [key], {
            [key]: e.target.value
          }));
        }}
      />
    </div>
  </Section>;

const ListSection = (struct, dispatch, key) => {
  let name = key === 'objectives'
  ? `Personal Objectives`
  : `${key.charAt(0).toUpperCase() + key.slice(1)}`;

  let resourcesLink = key === 'resources'
  ? <span
    style={ { marginRight: '20px' }}
      className={ styles.okrFooterButton }
      onClick = {e => {
        e.preventDefault();
        e.stopPropagation();

        alert(`This doesn't work yet!`);
      }}
    >+ Add People Resource</span>
  : undefined;

  let d = debounce(dispatch, 1000)
  return (
    <Section name={name}>
      <ol className={ styles.listSection }>
        {
          struct.get(key)
          .map((c, i) =>
            <li key={c.get('id') || `${key}-${i}`} className={ styles.listItem }>
              <TextInput
                placeholder = {`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                value={c.get('name')}
                onChange = {e => {
                  e.stopPropagation();
                  d(updateField(struct.get('id'), [key, i], {
                    ...c.toJSON(),
                    name: e.target.value
                  }));
                }}
              />
            </li>
          )
        }
      </ol>
      <div className={ styles.okrFooter }>
         { resourcesLink }
        <span
          className={ styles.okrFooterButton }
          onClick = {e => {
            e.preventDefault();
            e.stopPropagation();

            dispatch(addField(struct.get('id'), [key], ''));
          }}
        >+ Add {key.slice(0, key.length - 1)}</span>
      </div>
   </Section>
  )
}

class MissionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  componentWillMount() {
    const { id } = this.props.params;
    this.props.dispatch(getMission(id));
  }

  render() {
    const { dispatch, mission, users } = this.props;
    if (mission.size === 0) {
      return <div className={ styles.missionEditor }>Loading...</div>
    }

    const TextContainer = partial(TextSection, [mission, dispatch]);
    const ListContainer = partial(ListSection, [mission, dispatch]);

    const user = !(mission.get('users').isEmpty())
    ? mission.get('users').get(0)
    : Map({});

    const getAssignUserModal = () => {
      // document.body.style.overflow = this.state.modalVisible
      //   ? 'hidden'
      //   : 'visible';

      if (this.state.modalVisible) {
        return (
          <Modal closeModal={() => this.setState({ modalVisible: false })}>
            <div className={styles.userPicker} onClick={e => e.stopPropagation()}>
              Search for a user
              <div className={styles.userPickerForm}>
                <TextInput />
                <Button primary>Search</Button>
              </div>

              Search Results:
              <div className={styles.userPickerDropdown}>
                {
                  users.map(val => {
                    const fullName = `${val.firstName} ${val.lastName}`;
                    return (
                      <div key={val.id} className={styles.userPickerItem}>
                        <div className={styles.userPickerInfo}>
                        <img src={val.img} alt={ fullName } className={styles.userPickerImg} />
                        <span className={styles.userPickerName}>{ fullName }</span>
                        </div>
                        <Button primary size="sm" right
                        onClick={e => this.setState({ modalVisible: false })}>Assign</Button>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </Modal>
        );
      }
    };

    const okrs = mission.get('targets')
      .map((c, idx) =>
        <div key={ c.get('id') } className={ styles.okrSection }>
          <div className={ styles.okrObjective }>
            <label className={ styles.okrObjectiveLabel }>Objective</label>
            <TextInput
              value={ c.get('objective') }
              onChange={ e => {
                e.stopPropagation();
                dispatch(updateField(c.get('id'), ['targets', idx], {
                  ...c.toJSON(),
                  objective: e.target.value
                }))
              }}
            />
          </div>

          <ul className={ styles.okrResults }>
            {
              c.get('keyResults')
              .map((o, i) =>
                <li key={`${c.get('id')}-${i}}`} className={ styles.okrResult}>
                  <TextInput
                    value={o}
                    onChange={ e => {
                      e.stopPropagation();
                      console.log(c)
                      dispatch(updateField(c.get('id'), ['targets', idx], {
                        ...c.toJSON(),
                        keyResults: c.get('keyResults')
                          .update(i, () => e.target.value)
                      }))
                    }}
                  />
                </li>)
            }
          </ul>
          <div className={ styles.okrFooter }>
            <span
              className={ styles.okrFooterButton }
              onClick = {e => {
                e.preventDefault();
                e.stopPropagation();

                dispatch(updateField(c.get('id'), ['targets', idx], {
                  ...c.toJSON(),
                  keyResults: c.get('keyResults')
                  .update(c.get('keyResults').size, () => '')
                }))
              }}
            >+ Add key result</span>
          </div>
        </div>
      );

    return (
      <div className={ styles.missionEditor }>
        <h2 className={ styles.header }>
          <div className={ styles.innerHeader }>
            <span>Mission Editor - {mission.get('name')}</span>
            <div className={styles.userPickerButton} onClick={() => this.setState({ modalVisible: true })}>
              { this._returnUserImage(user) }
            </div>
              { getAssignUserModal() }
          </div>
        </h2>

        <div className={styles.body}>
          { TextContainer('name') }
          { TextContainer('description') }
          { TextContainer('duration') }

          <Section name="Objectives and Key Results">
            { okrs }
            <Button primary onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              dispatch(addField(mission.get('id'), ['targets']));
            }} >Add OKR</Button>
          </Section>

          { ListContainer('objectives') }
          { ListContainer('resources') }
        </div>
      </div>
    );
  };

  _returnUserImage = (user) => {
    if (user.isEmpty())
      return 'Unassigned';
    // if (user.get('img'))
      // return <img className={styles.avatar} src={ `${user.get('img')}/small` } />;

    return `${user.get('firstName')} ${user.get('lastName')}`;
  }
}

MissionEditor.propTypes = {
  mission: PropTypes.instanceOf(Map)
};

MissionEditor.defaultProps = {
  mission: new Map()
};

const mapStateToProps = state => ({
  mission: state.get('mission'),
  users: new List([
    {
      id: (Math.random()),
      firstName: 'Rohan Nair',
      lastName: '',
      role: 'user',
      img: `//placehold.it/48x48/${((1<<24)*Math.random()|0).toString(16)}`
    },
    {
      id: (Math.random()),
      firstName: 'Ray Kanani',
      lastName: '',
      role: 'user',
      img: `//placehold.it/48x48/${((1<<24)*Math.random()|0).toString(16)}`
    },
    {
      id: (Math.random()),
      firstName: 'Stu Peters',
      lastName: '',
      role: 'user',
      img: `//placehold.it/48x48/${((1<<24)*Math.random()|0).toString(16)}`
    }
  ])
});

export default connect(mapStateToProps)(MissionEditor);
