import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { MonacoLanguageClient } from 'monaco-languageclient';

import {
  REVA_LANGUAGE_ID2 as REVA_LANGUAGE_ID,
  registerRevaLanguage2,
  startWebSocket,
} from './languageService';

registerRevaLanguage2();

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: false,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
};

export const Editor = () => {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor;
  let model: monaco.editor.ITextModel;
  let languageClient: MonacoLanguageClient | null = null;

  const dispose = async () => {
    monacoEditor.dispose();
    model?.dispose();
    await languageClient?.dispose();
  };

  const editorDidMount: EditorDidMount = (editor) => {
    model = monaco.editor.createModel(
      '',
      REVA_LANGUAGE_ID,
      monaco.Uri.parse(`file:///rule-${Math.random()}.${REVA_LANGUAGE_ID}`)
    );
    editor.setModel(model);
    startWebSocket('ws://localhost:5008', languageClient);
    editor.focus();
    monacoEditor = editor;
  };

  return (
    <MonacoEditor
      width="100%"
      height="100vh"
      language={REVA_LANGUAGE_ID}
      theme="vs-dark"
      options={MONACO_OPTIONS}
      editorDidMount={editorDidMount}
      value={''}
    />
  );
};
