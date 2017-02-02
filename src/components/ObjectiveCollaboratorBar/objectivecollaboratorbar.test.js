import React from 'react'

import ObjectiveCollaboratorBar from './index.js'

describe('Test suite for ObjectiveCollaboratorBar component', () => {
  it('ObjectiveCollaboratorBar should exist', () => {
    let wrapper = shallow(<ObjectiveCollaboratorBar/>)
    expect(wrapper).toMatchSnapshot()
  })
})

