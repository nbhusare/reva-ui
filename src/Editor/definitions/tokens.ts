import { type languages } from 'monaco-editor';

export const tokens: languages.IMonarchLanguage = {
  keywords: [],
  tokenizer: {
    num: [
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@keywords': 'keyword',
          },
        },
      ],
    ],
  },
};
