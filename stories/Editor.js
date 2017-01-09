import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Editor from '../src/components/Editor'

storiesOf('Editor', module)
  .add('with text', () => (
    <Editor onClick={action('clicked')}>Hello World</Editor>
  ))
