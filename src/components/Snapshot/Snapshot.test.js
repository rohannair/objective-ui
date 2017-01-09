import React from 'react'
import Snapshot from './index.js'

describe('Test suite for Snapshot component', () => {
  it('Snapshot should exist', () => {
    let wrapper = shallow(<Snapshot/>)
    expect(wrapper).toMatchSnapshot()
  })
})

