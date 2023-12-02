// import ReactCodeEditor from '@renderer/components/CodeEditor/reactCodeEditor'
import VueCodeEditor from '@renderer/components/CodeEditor/vueCodeEditor'
import { UploadFiles } from '@renderer/components/utils/UploadFiles'
import { Button } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function InterfaceDemo() {
  const [fileList, setFileList] = useState<any[]>([])
  const navigate = useNavigate()
  const localGet = () => {
    axios({
      method: 'GET',
      url: 'http://124.222.153.56:19591/attendance/saveSchedule/getSaveSchedule'
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getData = async () => {
    const res = await (window as any).interfaceApi.sendGet(
      'http://124.222.153.56:19591/attendance/saveSchedule/getSaveSchedule',
      {}
    )
    console.log(res)
  }
  const uploadFile = async () => {
    const filePath = fileList[0].originFileObj.path
    const res = await (window as any).interfaceApi.sendPostFile(
      'http://124.222.153.56:19591/attendance/unsign/uploadExcel',
      {},
      filePath
    )
    console.log(res)
  }
  const notic = () => {
    ;(window as any).publicApi.notic('提示', '您有新的信息')
  }
  const jump = () => {
    navigate('/inter')
  }
  return (
    <div>
      <Button onClick={jump}>跳转</Button>
      <Button onClick={notic}>测试通知</Button>
      <hr />
      <Button onClick={localGet}>本地请求</Button>
      <Button onClick={getData}>测试get请求</Button>
      <Button onClick={uploadFile}>上传文件</Button>
      <UploadFiles onChangeFn={setFileList} limit={1} fileList={fileList}></UploadFiles>
      {/* 编辑器 */}
      {/* <ReactCodeEditor></ReactCodeEditor> */}
      <VueCodeEditor></VueCodeEditor>
    </div>
  )
}
