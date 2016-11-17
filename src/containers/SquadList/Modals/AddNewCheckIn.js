import React, { Component, PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';
import TextArea from '../../../components/Forms/TextArea';

import styles from './modal.css';

export default (p) => {
  const onSubmit = e => {
    e.preventDefault();
    p.onSubmit();
  };

  return (
    <form className={styles.innerModal} onSubmit={onSubmit}>
      <label className={styles.modal__item}>
        <TextInput
          placeholder='Title'
          value={ p.name }
          onChange={val => p.onNameChange(val) }
        />

        <TextArea
          placeholder='Body'
          value={p.description}
          onChange={val => p.onDescriptionChange(val) }
        />
      </label>

      <Button primary onClick={onSubmit}>Save Snapshot</Button>
    </form>
  );
};
