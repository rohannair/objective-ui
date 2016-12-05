import React, { PropTypes } from 'react';
import styles from './Alert.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Alert = p => {
  const classname = cx({
    [styles[p.type]]: true
  });


  return (
    <div className={classname}>
      { getIcon(p.type) }
      <div className={styles.body}>
        { p.children }
      </div>
      <div className={styles.close}>
        <i className={'zmdi zmdi-close'} onClick={p.close}/>
      </div>
    </div>
  );
};

Alert.proptypes = {
  type: PropTypes.oneOf(['info', 'danger', 'warn', 'success']),
  children: PropTypes.string,
  close: PropTypes.func
};

const iconMap = {
  info: 'info-outline',
  danger: 'alert-polygon',
  warn: 'alert-triangle',
  success: 'check-circle'
};
const getIcon = (type) => <i className={`zmdi zmdi-${iconMap[type]}`} />;

export default Alert;
