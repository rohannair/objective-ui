import React from 'react'
import Section from './index.js'

describe('Test suite for Section component', () => {
  it('Section should exist', () => {
    let wrapper = shallow(<Section/>)
    expect(wrapper).toMatchSnapshot()
  })
})

