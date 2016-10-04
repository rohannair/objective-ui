import React, { Component, PropTypes } from 'react';
import Immutable, { Map } from 'immutable';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { partial } from 'ramda';

// Deps
import Card from '../../components/Card';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';
import TextArea from '../../components/Forms/TextArea';

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
          dispatch(updateField([key], e.target.value));
        }}
      />
    </div>
  </Section>;

const ListSection = (struct, dispatch, key) =>
  <Section name={`${key.charAt(0).toUpperCase() + key.slice(1)}`}>
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
                dispatch(updateField([key, i, 'name'], e.target.value));
              }}
            />
          </li>
        )
      }
    </ol>
    <div className={ styles.okrFooter }>
      <span
        className={ styles.okrFooterButton }
        onClick = {e => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(addField([key], ''));
        }}
      >+ Add {key.slice(0, key.length - 1)}</span>
    </div>
  </Section>;

class MissionEditor extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.dispatch(getMission(id));
  }

  render() {
    const { mission, dispatch } = this.props;

    if (Object.keys(mission.toJSON()).length === 0) {
      return <div>Loading...</div>
    }

    const TextContainer = partial(TextSection, [mission, dispatch]);
    const ListContainer = partial(ListSection, [mission, dispatch]);

    const okrs = mission.get('targets')
      .map(c =>
        <div key={ c.get('id') } className={ styles.okrSection }>
          <div className={ styles.okrObjective }>
            <label className={ styles.okrObjectiveLabel }>Objective</label>
            <TextInput value={ c.get('objective') } />
          </div>

          <ul className={ styles.okrResults }>
            {
              c.get('keyResults')
              .map((o, i) =>
                <li key={`${c.get('id')}-${i}}`} className={ styles.okrResult}>
                  <TextInput value={o} />
                </li>)
            }
          </ul>
          <div className={ styles.okrFooter }>
            <span
              className={ styles.okrFooterButton }
              onClick = {e => {
                e.preventDefault();
                e.stopPropagation();

                dispatch(updateField([key, i, 'name'], ''));
              }}
            >+ Add key result</span>
          </div>
        </div>
      );

    return (
      <div className={ styles.missionEditor }>
        <h2 className={ styles.header }>
          Mission Editor - {mission.get('name')}
        </h2>

        <div className={styles.body}>

          { TextContainer('name') }
          { TextContainer('description') }
          { TextContainer('duration') }

          <Section name="Objectives and Key Results">
            { okrs }
            <Button primary onClick={() =>{}} >Add OKR</Button>
          </Section>

          { ListContainer('objectives') }
          { ListContainer('resources') }

          <div className={ styles.footer }>
            <Button onClick={() => alert('Saved!')}>Save Mission</Button>
          </div>
        </div>
      </div>
    );
  }
}

MissionEditor.propTypes = {
  mission: PropTypes.instanceOf(Map)
};

MissionEditor.defaultProps = {
  mission: new Map()
};

const mapStateToProps = state => ({
  mission: state.get('mission')
});

export default connect(mapStateToProps)(MissionEditor);
