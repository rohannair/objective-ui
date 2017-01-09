const fs = require('fs')
const path = require('path')
const isDir = require('is-dir')
const chalk = require('chalk')

const src = path.join(__dirname, '..', 'src', 'components')

const testTemplate = (name) => `import React from 'react'
import ${name} from './index.js'

describe('Test suite for ${name} component', () => {
  it('${name} should exist', () => {
    let wrapper = shallow(<${name}/>)
    expect(wrapper).toMatchSnapshot()
  })
})

`

fs.readdir(src, function(e, files) {
  if (e) console.error(e)

  let componentFiles = files
    .filter(f => isDir.sync(`${src}/${f}`))
  console.log(componentFiles)

  componentFiles.forEach(f => {
    fs.writeFileSync(`${src}/${f}/${f}.test.js`, testTemplate(f))
  })
})

