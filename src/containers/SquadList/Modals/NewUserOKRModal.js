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
        <TextInput
          placeholder='Objective'
          value={ p.name }
          onChange={val => p.onChangeName(val) }
        />
      </label>

      <label className={styles.modal__item}>
          { p.keyResults.map((r, i) =>
            <TextInput
              key={`kr-${i}`}
              placeholder='A Measurable Key Result'
              value={ r }
              onChange={val => p.onChangeKeyResults(val, i) }
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
        <TextInput
          placeholder='Timeline'
          value={ p.timeline }
          onChange={val => p.onChangeTimeline(val) }
        />
      </label>

      <label className={styles.modal__item}>
        { p.resources.map((r, i) =>
          <TextInput
            key={`kr-${i}`}
            placeholder='A resource'
            value={ r }
            onChange={ val => p.onChangeResources(val, i) }
            />
        )}
        <div className={styles.addButton} onClick={ e => {
          e.stopPropagation();
          if (p.resources.length === 3) {
            // TODO: Have error messaging here
            return;
          }
          p.onAddResource();
        }}>Add Resource</div>

      </label>
      <Button primary onClick={onSubmit}>Save OKR</Button>
    </form>
  );
};
