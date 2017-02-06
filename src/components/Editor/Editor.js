import React, { PropTypes, Component } from 'react'

import styles from './Editor.css'
import '../../../node_modules/draft-js-mention-plugin/lib/plugin.css'
import '../../../node_modules/draft-js-linkify-plugin/lib/plugin.css'
import '../../../node_modules/draft-js-emoji-plugin/lib/plugin.css'

import { fromJS } from 'immutable'
import Draft from 'draft-js-plugins-editor'

import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import { stateToHTML } from 'draft-js-export-html'

const linkifyPlugin = createLinkifyPlugin()
const mentionPlugin = createMentionPlugin()
const emojiPlugin = createEmojiPlugin()

const { MentionSuggestions } = mentionPlugin
const { EmojiSuggestions } = emojiPlugin

const plugins = [
  emojiPlugin,
  linkifyPlugin,
  // mentionPlugin
]

const mentions = fromJS([
  {
    name: 'Ray Kanani',
    link: 'https://twitter.com/raykanani',
  },
  {
    name: 'Stu Peters',
    link: 'https://twitter.com/juliandoesstuff',
  },
  {
    name: 'Rohan Nair',
    link: 'https://twitter.com/rohan10',
  },
])

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: mentions
    }
  }

  onAddMention = () => {
    // Do something here
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    })
  }

  focus = () => this.editor.focus()

  render() {
    return (
      <div className={styles.Editor} onClick={this.focus}>
        <Draft
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          plugins={plugins}
          spellCheck={true}
          ref={(element) => {
            this.editor = element
          }}
        />

        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />

        <EmojiSuggestions />
      </div>
    )
  }
};

export default Editor
