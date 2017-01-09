import React from 'react'
import Button from './index.js'

describe('Test suite for Button component', () => {
  it('Button should exist', () => {
    let wrapper = shallow(<Button/>)
    expect(wrapper).toMatchSnapshot()
  })
})

