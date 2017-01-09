import React from 'react'
import Pill from './index.js'

describe('Test suite for Pill component', () => {
  it('Pill should exist', () => {
    let wrapper = shallow(<Pill/>)
    expect(wrapper).toMatchSnapshot()
  })
})

