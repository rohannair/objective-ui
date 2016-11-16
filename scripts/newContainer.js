const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const isDir = require('is-dir');
const chalk = require('chalk');

const name = process.argv[2];
if (!name) {
  console.log(chalk.red('Usage npm run newcont <container-name>'));
  process.exit(0);
}

const containerName   = _.flowRight(_.upperFirst, _.camelCase)(name);
const dest            = path.join(__dirname, '..', 'src', 'containers', containerName);

const styleFile = `@import '../../styles/globals';
@import '../../styles/mixins';
@import '../../styles/layout';
.${containerName} {
  @extend container;
}`;

const containerFile = `import React, { Component, PropTypes } from 'react';
import styles from './${containerName}.css';

import { connect } from 'react-redux';
import Immutable from 'immutable';

class ${containerName} extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.${containerName}>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(${containerName});

`;

const indexFile = `import ${containerName} from './${containerName}';
export default ${containerName};
`;

const tests = `import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ${containerName} from './index';
const wrapper = shallow(<${containerName}/>);

test('${containerName} does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
`;

if (isDir.sync(dest)) {
  console.error(chalk.red(`Container ${containerName} already exists`));
  process.exit(0);
}

fs.mkdir(dest);
fs.writeFileSync(path.join(dest, 'index.js'), indexFile);
fs.writeFileSync(path.join(dest, `${containerName}.js`), containerFile);
fs.writeFileSync(path.join(dest, `${containerName}.css`), styleFile);

console.log(chalk.green(`Container ${containerName} created`));
