import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import { Editor, loader } from '@monaco-editor/react'
loader.config({
  paths: {
    vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs'
  }
})
interface Props {
  children?: ReactNode
  onchange?: (date: string | undefined) => void
  value?: string
  valuetype?: 'json' | 'xml' | 'swift'
}
const JsonInput: FC<Props> = (props) => {
  const { onchange, value, valuetype } = props
  return (
    <Editor
      height="30vh"
      value={value}
      defaultLanguage={valuetype || 'json'}
      className={styles.rootjson}
      onChange={onchange}
      defaultValue="{}"
    />
  )
}
export default memo(JsonInput)
