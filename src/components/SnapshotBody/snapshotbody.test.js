import React from 'react'

import SnapshotBody from './index.js'

describe('Test suite for SnapshotBody component', () => {
  it('SnapshotBody should exist', () => {
    let wrapper = shallow(<SnapshotBody/>)
    expect(wrapper).toMatchSnapshot()
  })
})

