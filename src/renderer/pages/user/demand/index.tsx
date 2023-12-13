import MarkdownCodeEditor from '@renderer/components/CodeEditor/mdCodeEditor'
import { Button } from 'antd'
import style from './index.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addProjectDemandApi, getProjectInfoApi } from '@renderer/aRequest/user'
import { useSearchParams } from 'react-router-dom'
export default function Demand() {
  const [value, setValue] = useState('')
  const defaultValue = useRef<string>('')
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  useEffect(() => {
    getProjectInfoApi({ projectId }).then((res) => {
      setValue(res.data.projectDemand || '')
      defaultValue.current = res.data.projectDemand
    })
  }, [])
  const addDemand = useCallback(() => {
    addProjectDemandApi({ projectId, projectDemand: value })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [value])
  return (
    <div>
      <div className={style.operatorContainer}>
        <Button onClick={addDemand}>发布需求</Button>
      </div>
      <MarkdownCodeEditor
        value={value}
        setValue={setValue}
        defaultValue={defaultValue.current}
      ></MarkdownCodeEditor>
    </div>
  )
}
