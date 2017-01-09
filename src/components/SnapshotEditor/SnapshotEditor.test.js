import React from 'react'
import SnapshotEditor from './index.js'

describe('Test suite for SnapshotEditor component', () => {
  it('SnapshotEditor should exist', () => {
    let wrapper = shallow(<SnapshotEditor/>)
    expect(wrapper).toMatchSnapshot()
  })
})

