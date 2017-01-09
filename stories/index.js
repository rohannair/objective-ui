import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Welcome from './Welcome'

import Editor from '../src/components/Editor'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Edit')}/>
  ))

storiesOf('Editor', module)
  .add('with text', () => (
    <Editor onClick={action('clicked')}>Hello World</Editor>
  ))
