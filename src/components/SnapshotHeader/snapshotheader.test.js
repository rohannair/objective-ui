import React from 'react'

import SnapshotHeader from './index.js'

describe('Test suite for SnapshotHeader component', () => {
  it('SnapshotHeader should exist', () => {
    let wrapper = shallow(<SnapshotHeader/>)
    expect(wrapper).toMatchSnapshot()
  })
})

