import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import isDir from 'is-dir'
import chalk from 'chalk'

const name = process.argv[2]
if (!name) {
  console.log(chalk.red('Usage npm run newcomp <component-name>'))
  process.exit(0)
}

const componentName   = _.flowRight(_.upperFirst, _.camelCase)(name)
const dest            = path.join(__dirname, '..', 'src', 'components', componentName)

const componentFile = `import React, { PropTypes } from 'react'
import styled from 'styled-components'

const ${componentName} = p => (
  <div className={styles.${componentName.toLowerCase()}}>
    { p.children }
  </div>
)

export default styled(${componentName})\`

\`
`

const indexFile = `import ${componentName} from './${componentName}'
export default ${componentName}
`

const tests = `import React from 'react'

import ${componentName} from './index.js'

describe('Test suite for ${componentName} component', () => {
  it('${componentName} should exist', () => {
    let wrapper = shallow(<${componentName}/>)
    expect(wrapper).toMatchSnapshot()
  })
})

`

if (isDir.sync(dest)) {
  console.error(chalk.red(`Component ${componentName} exists`))
  process.exit(0)
}

fs.mkdir(dest)
fs.writeFileSync(path.join(dest, 'index.js'), indexFile)
fs.writeFileSync(path.join(dest, `${componentName}.js`), componentFile)
fs.writeFileSync(path.join(dest, `${componentName.toLowerCase()}.test.js`), tests)
console.log(chalk.green('Component Created'))
