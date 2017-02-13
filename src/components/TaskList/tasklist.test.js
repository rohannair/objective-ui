import React from 'react'

import TaskList from './index.js'

describe('Test suite for TaskList component', () => {
  it('TaskList should exist', () => {
    let wrapper = shallow(<TaskList/>)
    expect(wrapper).toMatchSnapshot()
  })
})

