import React, { PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

export default (p) => {
  const onSubmit = (e) => {
    e.preventDefault();
    p.onSave();
  };

  return (
    <form className={styles.innerModal} onSubmit={onSubmit}>
      <label className={styles.modal__item}>
        <h3 className={styles.modal__label}>Create Squad Name</h3>
        <TextInput
          placeholder='Please enter Squad Name'
          value={ p.name }
          onChange={(e) => {
            e.preventDefault();
            p.onChangeName(e.target.value)
          }}
        />
      </label>
      <Button primary onClick={onSubmit}>Create Squad</Button>
    </form>
  );
};

