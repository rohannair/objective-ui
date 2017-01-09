import React from 'react'
import UserTab from './index.js'

describe('Test suite for UserTab component', () => {
  it('UserTab should exist', () => {
    let wrapper = shallow(<UserTab/>)
    expect(wrapper).toMatchSnapshot()
  })
})

