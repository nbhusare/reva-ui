import { useEditor } from './useEditor'

export const Editor = () => {
  const { editorContainer } = useEditor({ defaultValue: '' })

  return <div ref={editorContainer} style={{ height: 600, width: 600 }}></div>
}
