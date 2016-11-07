import React, { Component, PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

export default (p) => <div />;
  // <form className={styles.newSquadModal} onSubmit={ () => {} }>
  //   <label className={styles.modal__item}>
  //     <h3 className={styles.modal__label}>Objective</h3>
  //     <TextInput
  //       type='name'
  //       placeholder='Please enter objective'
  //       value={ this.state.mission.objective }
  //       onChange={ e => {
  //         e.preventDefault();
  //         this.setState({
  //           mission: {
  //             ...this.state.mission,
  //             objective: e.target.value
  //           }
  //         });
  //       }}
  //     />
  //   </label>

  //   <label className={styles.modal__item}>
  //     <h3 className={styles.modal__label}>Key Results</h3>
  //       { this.state.mission.keyResults.map((r, i) =>
  //         <TextInput
  //           key={`kr-${i}`}
  //           placeholder='Enter a measurable Key Result'
  //           value={ r }
  //           onChange={ (e) => {
  //             this.setState({
  //               mission: {
  //                 ...this.state.mission,
  //                 keyResults: [
  //                   ...this.state.mission.keyResults.slice(0, i),
  //                   e.target.value,
  //                   ...this.state.mission.keyResults.slice(i + 1)
  //                 ]
  //               }
  //             })
  //           } }
  //           />
  //       )}
  //       <div className={styles.addButton} onClick={ e => {
  //         e.stopPropagation();
  //         if (this.state.mission.keyResults.length === 3 ) {
  //           // TODO: Have error messaging here
  //           return;
  //         }

  //         this.setState({
  //           mission: {
  //             ...this.state.mission,
  //             keyResults: [ ...this.state.mission.keyResults, '' ]
  //           }
  //         })
  //       }}>Add Key Result</div>
  //   </label>

  //   <label className={styles.modal__item}>
  //     <h3 className={styles.modal__label}>Timeline</h3>
  //     <TextInput
  //       type='name'
  //       placeholder='Please timeline'
  //       value={ this.state.mission.timeline }
  //       onChange={ e => {
  //         e.preventDefault();
  //         this.setState({
  //           mission: {
  //             ...this.state.mission,
  //             timeline: e.target.value
  //           }
  //         });
  //       }}
  //     />
  //   </label>
  //   <Button primary onClick={this._createMission}>Save OKR</Button>
  // </form>;
