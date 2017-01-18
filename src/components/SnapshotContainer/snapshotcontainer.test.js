import React from 'react'

import SnapshotContainer from './index.js'

describe('Test suite for SnapshotContainer component', () => {
  it('SnapshotContainer should exist', () => {
    let wrapper = shallow(<SnapshotContainer/>)
    expect(wrapper).toMatchSnapshot()
  })
})

