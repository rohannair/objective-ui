import React from 'react'

import SnapshotFooter from './index.js'

describe('Test suite for SnapshotFooter component', () => {
  it('SnapshotFooter should exist', () => {
    let wrapper = shallow(<SnapshotFooter/>)
    expect(wrapper).toMatchSnapshot()
  })
})

