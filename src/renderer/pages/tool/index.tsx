import ReactCodeEditor from '@renderer/components/CodeEditor/reactCodeEditor'
import VueCodeEditor from '@renderer/components/CodeEditor/vueCodeEditor'
import { Select } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'

export default function Tool() {
  const [codeType, setCodeType] = useState<string>('react')
  const handleChange = (value: string) => {
    setCodeType(value)
  }
  return (
    <div>
      <div className={style.operator}>
        <Select
          defaultValue={codeType}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'react', label: 'react' },
            { value: 'vue', label: 'vue' }
          ]}
        />
      </div>
      <div>
        {codeType === 'react' ? (
          <ReactCodeEditor></ReactCodeEditor>
        ) : (
          <VueCodeEditor></VueCodeEditor>
        )}
      </div>
    </div>
  )
}
