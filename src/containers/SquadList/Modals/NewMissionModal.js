import React, { Component, PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

export default (p) => {
  const onSubmit = e => {
    e.preventDefault();
    p.onSubmit();
  };

  return (
    <form className={styles.innerModal} onSubmit={onSubmit}>
      <label className={styles.modal__item}>
        <h3 className={styles.modal__label}>Objective</h3>
        <TextInput
          placeholder='Please enter objective'
          value={ p.name }
          onChange={e => {
            e.preventDefault();
            p.onChangeName(e.target.value);
          }}
        />
      </label>

      <label className={styles.modal__item}>
        <h3 className={styles.modal__label}>Key Results</h3>
          { p.keyResults.map((r, i) =>
            <TextInput
              key={`kr-${i}`}
              placeholder='Enter a measurable Key Result'
              value={ r }
              onChange={e => {
                e.preventDefault();
                p.onChangeKeyResults(e.target.value, i);
              }}
              />
          )}
          <div className={styles.addButton} onClick={ e => {
            e.stopPropagation();
            if (p.keyResults.length === 3) {
              // TODO: Have error messaging here
              return;
            }
            p.onAddKeyResult();
          }}>Add Key Result</div>
      </label>

      <label className={styles.modal__item}>
        <h3 className={styles.modal__label}>Timeline</h3>
        <TextInput
          placeholder='Timeline'
          value={ p.timeline }
          onChange={e => {
            e.preventDefault();
            p.onChangeTimeline(e.target.value);
          }}
        />
      </label>
      <Button primary onClick={onSubmit}>Save OKR</Button>
    </form>
  );
};
