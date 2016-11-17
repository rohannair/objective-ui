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
        <TextInput
          placeholder='Squad Name'
          value={ p.name }
          onChange={val => p.onChangeName(val) }
        />
      </label>
      <Button primary onClick={onSubmit}>Create Squad</Button>
    </form>
  );
};

