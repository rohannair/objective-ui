import React from 'react'
import Alert from './index.js'

describe('Test suite for Alert component', () => {
  it('Alert should exist', () => {
    let wrapper = shallow(<Alert/>)
    expect(wrapper).toMatchSnapshot()
  })
})

