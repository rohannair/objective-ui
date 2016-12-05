import React, { PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

const Modal = (props) => {
  const users = props.users.results.length > 0
  ? <div className={styles.modal__item}>
      <h5 className={styles.modal__label}>Results</h5>
      <div className={styles.resultContainer}>
        { props.users.results.map(u =>
          <div key={`result-${u.id}`} className={styles.searchResult}>
            <img className={styles.avatar} src={u.img}/>
            <div className={styles.searchResultInfo}>
              <h3 className={styles.searchResultInfo__name}>
              {
                u.firstName
                ? `${u.firstName} ${u.lastName}`
                : u.email
              }
              </h3>
              <p>{u.jobTitle}</p>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                transparent
                onClick={e => {
                  e.preventDefault();
                  props.onEnter(u.id);
                }}
              >Assign</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  : undefined;

  return (
    <div className={styles.innerModal}>
      <label className={styles.modal__item}>
        <TextInput
          label='Search for user'
          onChange={ val => onType(val, props.onType) }
        />
      </label>
      { users }
    </div>
  );
};

const onType = (val, fn) => {
  // if (val.length < 3) return;
  fn(val);
};

Modal.propTypes = {
  onEnter: PropTypes.func,
  onType: PropTypes.func
};

export default Modal;
