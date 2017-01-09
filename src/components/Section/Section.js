import React, { PropTypes } from 'react'
import styles from './Section.css'

const Section = props => {
  const textClasses = props.splash
  ? { heading: styles.splashHeading, sub: styles.splashSub }
  : { heading: styles.heading, sub: styles.sub }

  const sectionClasses = props.splash
  ? styles.sectionSplash
  : styles.section

  return (
    <div className={ sectionClasses } style= {{ backgroundColor: props.bgColor }}>
      <h2 className={ textClasses.heading }>{ props.title }</h2>
      <p className={ textClasses.sub }>{ props.subtitle }</p>
      <div>
        { props.children }
      </div>
    </div>
  )
}

Section.defaultProps = {
  bgColor: 'transparent',
  title: '',
  splash: false,
}

Section.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  splash: PropTypes.bool,
}

export default Section
