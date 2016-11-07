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
          onChange={e => {
            e.preventDefault();
            p.onNameChange(e.target.value);
          }}
        />

        <TextArea
          placeholder='Body'
          value={p.description}
          onChange={e => {
            e.preventDefault();
            p.onDescriptionChange(e.target.value);
          }}
        />
      </label>

      <label className={styles.modal__item__vert}>
        <input type='checkbox' /><span>Key completed</span>
      </label>

      <Button primary onClick={onSubmit}>Save Check-In</Button>
    </form>
  );
};
