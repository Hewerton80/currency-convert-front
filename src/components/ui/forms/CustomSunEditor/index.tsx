import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import assets from '../../../../../assets.json'
import styles from './styles.module.css'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})
interface CustomSunEditorProps {
  onChange?: (content: string) => void
}

function CustomSunEditor({ onChange }: CustomSunEditorProps) {
  return (
    <div className={styles.root}>
      <SunEditor
        onChange={(value) => onChange?.(value)}
        lang="pt_br"
        height="1000px"
        setOptions={{
          buttonList: [
            ['undo', 'redo', 'formatBlock'],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
              'removeFormat',
              'textStyle',
              'paragraphStyle',
            ],
            [
              'fontColor',
              'hiliteColor',
              'outdent',
              'indent',
              'align',
              'horizontalRule',
              'list',
              'table',
            ],
            ['link', 'image', 'video', 'audio', 'codeView'],
          ],
          imageFileInput: false,
        }}
      />
    </div>
  )
}

export default CustomSunEditor
