import { useEffect, useRef, useState } from 'react'
import { RevaEditor } from './editor'

interface Props {
  defaultValue?: string
}

export const useEditor = ({ defaultValue }: Props) => {
  const [editor, setEditor] = useState<RevaEditor | null>(null)
  const editorContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorContainer && editorContainer.current) {
      const newEditor = new RevaEditor(editorContainer.current)
      newEditor.startWebSocket('ws://localhost:3000')
      setEditor(newEditor)
    }

    return () => {
      editor?.dispose()
    }
  }, [editorContainer, defaultValue])

  return {
    editor,
    editorContainer,
  }
}
