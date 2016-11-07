import React, { PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

const Modal = (props) => {
  const users = props.users.get('results').size > 0
  ? <div className={styles.modal__item}>
      <h5 className={styles.modal__label}>Results</h5>
      { props.users.get('results').map(u =>
        <div key={`result-${u.id}`} className={styles.searchResult}>
          <img className={styles.avatar} src={u.img}/>
          <div className={styles.searchResultInfo}>
            <h3 className={styles.searchResultInfo__name}>{u.firstName} {u.lastName}</h3>
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
  : undefined;

  return (
    <div className={styles.innerModal}>
      <label className={styles.modal__item}>
        <h5 className={styles.modal__label}>Search for user</h5>
        <TextInput
          placeholder='Enter atleast 3 characters'
          onChange={ e => {
            const { value } = e.target;
            onType(value, props.onType);
          }}
        />
      </label>
      { users }
    </div>
  );
};

const onType = (val, fn) => {
  if (val.length < 3) return;
  fn(val);
};

Modal.propTypes = {
  onEnter: PropTypes.func,
  onType: PropTypes.func
};

export default Modal;
