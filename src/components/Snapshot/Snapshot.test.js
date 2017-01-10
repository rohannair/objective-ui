import React from 'react'
import Snapshot from './index.js'

describe('Test suite for Snapshot component', () => {
  it('Snapshot should exist', () => {
    const snap = { createdAt: Date.parse('2017-01-01') }
    let wrapper = shallow(<Snapshot snap={snap} showObjective={true}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
