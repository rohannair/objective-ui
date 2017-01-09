import React from 'react'
import User from './index.js'

describe('Test suite for User component', () => {
  it('User should exist', () => {
    let wrapper = shallow(<User/>)
    expect(wrapper).toMatchSnapshot()
  })
})

