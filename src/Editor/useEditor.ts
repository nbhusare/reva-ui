import { useEffect, useRef, useState } from 'react';
import { RevaEditor } from '.';

interface Props {
  defaultValue?: string;
}

interface UseEditorResult {
  editor: RevaEditor | null;
  editorContainer: React.RefObject<HTMLDivElement>;
}

export const useEditor = ({ defaultValue }: Props): UseEditorResult => {
  const [editor, setEditor] = useState<RevaEditor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  console.log(defaultValue);

  useEffect(() => {
    if (editorContainer?.current) {
      const newEditor = new RevaEditor(editorContainer.current);
      // TODO: Read from the environment
      newEditor.startWebSocket('ws://localhost:5008');
      setEditor(newEditor);
    }

    return () => {
      editor?.dispose();
    };
  }, []);

  return {
    editor,
    editorContainer,
  };
};
