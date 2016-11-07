import React, { PropTypes } from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/Forms/TextInput';

import styles from './modal.css';

export default (p) => <div />;
  // <form className={styles.newSquadModal} onSubmit={ () => {} }>
  //   <label className={styles.modal__item}>
  //     <h3 className={styles.modal__label}>Squad Name</h3>
  //     <TextInput
  //       type='name'
  //       placeholder='Please enter Squad Name'
  //       value={ this.state.squad.name }
  //       onChange={ (e) => {
  //         e.preventDefault();

  //         this.setState({
  //           squad: {
  //             ...this.state.squad,
  //             name: e.target.value
  //           }
  //         })
  //       } }
  //     />
  //   </label>

  //   <label className={styles.modal__item}>
  //     <h3 className={styles.modal__label}>Squad Leader</h3>
  //     <TextInput
  //       placeholder='Please enter Squad Leader'
  //       value={ this.state.squad.leader }
  //       onChange={ () => {} }
  //     />
  //   </label>
  //   <Button primary onClick={ () => {} }>Create Squad</Button>
  // </form>;
