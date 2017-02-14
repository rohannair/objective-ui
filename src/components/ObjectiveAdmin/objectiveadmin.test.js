import React from 'react'

import ObjectiveAdmin from './index.js'

describe('Test suite for ObjectiveAdmin component', () => {
  it('ObjectiveAdmin should exist', () => {
    let wrapper = shallow(<ObjectiveAdmin/>)
    expect(wrapper).toMatchSnapshot()
  })
})

