import React, { Component, PropTypes } from 'react'
import styles from './SettingsProfile.css'
import classNames from 'classnames/bind'

import Button from '../Button'
import Input from '../Forms/TextInput'
import Uploader from '../Uploader'

let cx = classNames.bind(styles)

class SettingsProfile extends Component {
  constructor(props) {
    super(props)

    const { img, firstName, lastName, jobTitle } = this.props.user

    this.state = {
      img,
      firstName,
      lastName,
      jobTitle
    }
  };

  render() {
    const classname = cx({
      [styles.SettingsProfile]: true
    })

    const user = this.state
    const imgSrc = /^http/.test(user.img)
    ? user.img
    : `data:image/jpeg;base64,${user.img}`

    const img = user.img
    ? <img className={styles.image} src={imgSrc} />
    : <div className={styles.placeholder}><i className="zmdi zmdi-account" /></div>

    return (
      <div className={classname}>
        <h2 className={styles.heading}>Edit Profile</h2>

        <section className={styles.imageForm}>
          <div className={styles.imageContainer}>
            { img }
          </div>
          <div className={styles.avatarButtonContainer}>
            <Uploader
              submitImage={this._handleChange.bind(this, 'img')}
              imageExists={!!this.state.img}
              resizeOptions={{ height: 250, width: 250, type: 'crop' }}>
              <Button primary>Upload New Avatar</Button>
            </Uploader>

          </div>
          <div className={styles.avatarButtonContainer}>
            <Button link onClick={e => {
              e.preventDefault()
              this.setState({
                ...this.state,
                img: ''
              })
            }}>Delete</Button>
          </div>
        </section>

        <section className={styles.form}>
          <Input
            type='text'
            label='First Name'
            value={user.firstName}
            onChange={this._handleChange.bind(this, 'firstName')}
          />

          <Input
            type='text'
            label='Last Name'
            value={user.lastName}
            onChange={this._handleChange.bind(this, 'lastName')}
          />

          <Input
            type='text'
            label='Title'
            value={user.jobTitle}
            onChange={this._handleChange.bind(this, 'jobTitle')}
          />
        </section>

        <section className={styles.buttonContainer}>
          <Button primary onClick={this._handleSubmit}>Confirm</Button>
        </section>
      </div>
    )
  };

  _handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    })
  };

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  };

};

export default SettingsProfile
