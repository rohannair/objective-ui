import React from 'react'
import ChangePassword from './index.js'

describe('Test suite for ChangePassword component', () => {
  it('ChangePassword should exist', () => {
    let wrapper = shallow(<ChangePassword/>)
    expect(wrapper).toMatchSnapshot()
  })
})

