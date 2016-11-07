import React, { Component, PropTypes } from 'react';
import styles from './UserEditor.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';
import dateFormat from 'dateformat';

import { getUser } from '../../state/actions/user.actions';

class UserEditor extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    const { id } = this.props.params;
    this.props.dispatch(getUser(id));
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.UserEditor}>
        <div className={styles.header}></div>
        <div className={styles.body}>
          <div className={styles.user}>
            <img className={styles.userImg} src={user.get('img')} />
            <h3 className={styles.userName}>{`${user.get('firstName')} ${user.get('lastName')}`}</h3>
            <p>{user.get('jobTitle')}</p>
            <p><a href={`mailto:${user.get('email')}`}>{user.get('email')}</a></p>

            <hr />

            <h4>Squads</h4>
            <ul className={styles.squads}>
              { user.get('squads').map(sq => {
                console.log('_________', sq.toJSON());
                return (<li key={sq.get('id')}>{sq.get('name')}</li>);
              })}
            </ul>
          </div>

          <div className={styles.missions}>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.get('user')
});

export default connect(mapStateToProps)(UserEditor);
