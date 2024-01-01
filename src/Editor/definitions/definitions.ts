import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { type languages } from 'monaco-editor'
import { tokens } from './tokens'

export const REVA_LANGUAGE_ID = 'reva'
export const REVA_LANGUAGE_EXTENSION = 'reva'

export const configuration: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    {
      open: '{',
      close: '}',
    },
    {
      open: '[',
      close: ']',
    },
    {
      open: '(',
      close: ')',
    },
  ],
}

export const language: languages.ILanguageExtensionPoint = {
  id: REVA_LANGUAGE_ID,
  aliases: [REVA_LANGUAGE_ID],
  extensions: [`.${REVA_LANGUAGE_EXTENSION}`],
}

export const registerRevaLanguage = () => {
  monaco.languages.register(language)
  monaco.languages.setLanguageConfiguration(REVA_LANGUAGE_ID, configuration)
  monaco.languages.setMonarchTokensProvider(REVA_LANGUAGE_ID, tokens)
}
