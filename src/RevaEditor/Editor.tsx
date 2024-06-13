import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { MonacoLanguageClient } from 'monaco-languageclient';

import { useEffect, useState } from 'react';
import {
  REVA_LANGUAGE_ID2 as REVA_LANGUAGE_ID,
  registerRevaLanguage2,
  startWebSocket,
} from './languageService';
import { Box, Center, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { ControlsPanel } from './ControlsPanel';
import { OutputPanel } from '../Layout/Syntax/OutputPanel';
import { FaTerminal } from 'react-icons/fa';
import { Examples } from './Examples';
import { revaExamples } from './Examples/Types';
import { revaLanguageGrammar } from './Grammar/definition';

export interface EditorProps extends FlexProps {
  source?: string;
}

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

export const Editor = (props: EditorProps) => {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor;
  monaco.languages.setMonarchTokensProvider('reva', revaLanguageGrammar);
  let model: monaco.editor.ITextModel;
  let languageClient: MonacoLanguageClient | null = null;

  const [source, setSource] = useState<string>('');

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
    <Flex {...props} direction={'column'}>
      <Examples
        examples={revaExamples}
        mt={25}
        mb={25}
        ml={25}
        w={250}
        onExampleSelect={(exampleSource: string) => setSource(exampleSource)}
      />
      <MonacoEditor
        width="100%"
        height="100vh"
        language={REVA_LANGUAGE_ID}
        theme="vs-dark"
        options={MONACO_OPTIONS}
        editorDidMount={editorDidMount}
        value={source}
      />
      <Flex direction="column">
        <Box h="25px" bg="rgb(36, 36, 36)" borderTop="5px" borderColor="black">
          <Icon ml="10px" as={FaTerminal} color="white" />
        </Box>
        <Flex h="200px">
          <Box w="35px" bg="rgb(36, 36, 36)">
            <Center>
              <ControlsPanel />
            </Center>
          </Box>
          <OutputPanel w="100%" />
        </Flex>
      </Flex>
    </Flex>
  );
};
