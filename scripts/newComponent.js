import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import isDir from 'is-dir';
import chalk from 'chalk';

const name = process.argv[2];
if (!name) {
  console.log(chalk.red('Usage npm run newcomp <component-name>'));
  process.exit(0);
}

const componentName   = _.flowRight(_.upperFirst, _.camelCase)(name);
const dest            = path.join(__dirname, '..', 'src', 'components', componentName);

const styleFile = `.${componentName} {

}`;

const componentFile = `import React, { PropTypes } from 'react';
import styles from './${componentName}.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const ${componentName} = (props) => {
  return (
    <div className="${componentName}">
    </div>
  );
};

export default ${componentName};
`;

const indexFile = `import ${componentName} from './${componentName}';
export default ${componentName};
`;

const tests = `import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ${componentName} from './index.jsx';
const wrapper = shallow(<${componentName}/>);

test('${componentName} does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
`;


if (isDir.sync(dest)) {
  console.error(chalk.red(`Component ${componentName} exists`));
  process.exit(0);
}

fs.mkdir(dest);
fs.writeFileSync(path.join(dest, 'index.js'), indexFile);
fs.writeFileSync(path.join(dest, `${componentName}.js`), componentFile);
fs.writeFileSync(path.join(dest, `${componentName}.test.js`), tests);
fs.writeFileSync(path.join(dest, `${componentName}.css`), styleFile);
console.log(chalk.green('Component Created'));
