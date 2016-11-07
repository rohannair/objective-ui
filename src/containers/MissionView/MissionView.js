import React, { Component, PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { partial } from 'ramda';
import debounce from 'lodash/debounce';
import dateFormat from 'dateformat';

// Deps
import Button from '../../components/Button';
import Card from '../../components/Card';

import { formatTitle } from '../../utils';

// Actions
import {
  addField,
  updateField,
  getMission
} from '../../state/actions/missions.actions';

import styles from './MissionView.css';

const Section = ({ children, name }) =>
  <div className={ styles.section }>
    <h2 className={ styles.sectionHeader }>{ name }</h2>
    { children }
  </div>;

const TextSection = (struct, dispatch, key, inputType) =>
  <Section name={formatTitle(key, ' ')}>
    <div className={ styles.sectionBody }>
      {struct.get(key)}
    </div>
  </Section>;

const ListSection = (struct, dispatch, key) => {
  let name = key === 'objectives'
  ? 'Personal Objectives'
  : `${key.charAt(0).toUpperCase() + key.slice(1)}`;

  return (
    <Section name={name}>
      <ol className={ styles.listSection }>
        { struct.get(key)
          .map((c, i) =>
            <li key={c.get('id') || `${key}-${i}`} className={ styles.listItem }>
              <span>{c.get('name')}</span>
            </li>
        )}
      </ol>
   </Section>
  );
};

class MissionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentWillMount() {
    const { id } = this.props.params;
    this.props.dispatch(getMission(id));
  }

  render() {
    const { dispatch, mission, users } = this.props;
    if (mission.size === 0) {
      return <div className={ styles.missionView }>Loading...</div>;
    }

    const TextContainer = partial(TextSection, [mission, dispatch]);
    const ListContainer = partial(ListSection, [mission, dispatch]);

    const user = !(mission.get('users').isEmpty())
    ? mission.get('users').get(0)
    : Map({});

    const okrs = mission.get('targets')
      .map((c, idx) =>
        <li key={ c.get('id') } className={ styles.okrSection }>
          { c.get('objective') }

          <ul className={ styles.okrResults }>
            {
              c.get('keyResults')
              .map((o, i) =>
                <li key={`${c.get('id')}-${i}}`} className={ styles.okrResult}>
                  {o}
                </li>)
            }
          </ul>
        </li>
      );

    return (
      <div className={ styles.missionView }>
        <h2 className={ styles.header }>
          <div className={ styles.innerHeader }>
            <span>{mission.get('name')}</span>
            <div className={styles.userPickerButton} onClick={() => this.setState({ modalVisible: true })}>
              { this._returnUserImage(user) }
            </div>
          </div>
        </h2>

        <div className={styles.body}>
          { TextContainer('description') }

          <Section name="End Date">
            <div className={ styles.sectionBody }>
              <span>{ dateFormat(new Date(mission.get('endAt')), 'yyyy-mm-dd') }</span>
            </div>
          </Section>

          <Section name="Targets & Progress">
            <ul>
              { okrs }
            </ul>
          </Section>

          { ListContainer('objectives') }
          { ListContainer('resources') }
        </div>
      </div>
    );
  };

  _returnUserImage = (user) => {
    if (user.isEmpty()) {
      return 'Unassigned';
    }
    // if (user.get('img'))
      // return <img className={styles.avatar} src={ `${user.get('img')}/small` } />;

    return `${user.get('firstName')} ${user.get('lastName')}`;
  }
}

MissionView.propTypes = {
  mission: PropTypes.instanceOf(Map)
};

MissionView.defaultProps = {
  mission: new Map()
};

const mapStateToProps = state => ({
  mission: state.get('mission')
});

export default connect(mapStateToProps)(MissionView);
