import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { partial } from 'ramda';

// Deps
import Card from 'components/Card';
import TextInput from 'components/Forms/TextInput';
import TextArea from 'components/Forms/TextArea';

// Actions
import {
  updateField
} from 'state/actions/missions.actions';

import styles from './MissionEditor.css';

const Section = ({ children, name }) =>
  <div className={ styles.section }>
    <h2 className={ styles.sectionHeader }>{name}</h2>
    { children }
  </div>;

const TextSection = (struct, dispatch, key) =>
  <Section name={`Mission ${key.charAt(0).toUpperCase() + key.slice(1)}`}>
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
  </Section>

const MissionEditor = (props) => {
  const { mission, dispatch } = props;
  const Input = partial(TextSection, [mission, dispatch]);

  const okrs = mission.get('okrs')
    .map(c =>
      <div key={ c.get('id') } className={ styles.okrSection }>
        <div className={ styles.okrObjective }>
          <TextInput value={ c.get('objective') } />
        </div>
        <div className={ styles.okrResults }>
          {
            c.get('keyResults')
            .map((o, i) =>
              <TextInput key={`${c.get('id')}-${i}}`} value={o} />)
          }
        </div>
      </div>
    );

  return (
    <div className={ styles.missionEditor }>
      <h1 className={ styles.header }>
        { `New Mission - ${mission.get('name')}` }
      </h1>

      <Card>
        { Input('name') }
        { Input('description') }
        { Input('duration') }

        <Section name="Objectives and Key Results">
          { okrs }
        </Section>

        <Section name="Personal Objectives">
          {
            mission.get('objectives')
            .map(c =>
              <div key={c.get('id')}>
                <TextInput value={c.get('name')} />
              </div>)
          }
        </Section>

        <div className={ styles.section }>
          <h2 className={ styles.sectionHeader }>Key Resources</h2>
          <div className={ styles.sectionBody }>
            {
              mission.get('resources')
              .map(c =>
                <div key={c.get('id')}>
                  <TextInput value={c.get('name')} />
                </div>)
            }
          </div>
        </div>

      </Card>
    </div>
  );
}

MissionEditor.propTypes = {
  mission: PropTypes.instanceOf(Immutable.Map)
};

MissionEditor.defaultProps = {

}

const mapStateToProps = state => ({
  mission: state.get('mission')
});

export default connect(mapStateToProps)(MissionEditor);
