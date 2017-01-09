import React from 'react'
import Objective from './index.js'

describe('Test suite for Objective component', () => {
  it('Objective should exist', () => {
    let wrapper = shallow(<Objective/>)
    expect(wrapper).toMatchSnapshot()
  })
})

