import React, {
  ChangeEvent,
  ChangeEventHandler,
  ElementRef,
  ReactEventHandler,
  memo,
  useEffect,
  useRef,
  useState
} from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import { Badge, Col, Form, Input, Modal, Row, Select, SelectProps, Space, Tag } from 'antd'
import { InterSpecinfo } from '../../../types/apiTypes'
import TextArea from 'antd/es/input/TextArea'
import DemoEditor from '../../DemoMarkDown'
interface Props {
  children?: ReactNode
}
const InterSpec: FC<Props> = () => {
  const options: SelectProps['options'] = []
  const [mdvalue, setMd] = useState('')
  const [modal2Open, setModal2Open] = useState(false)
  const markDownref = useRef<ElementRef<typeof DemoEditor>>(null)
  //信息状态
  const [interSpec, setSpec] = useState<InterSpecinfo>({
    name: '',
    label: [],
    username: ''
  })
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i
    })
  }
  const handleChange = (value: string[]) => {
    const newobj = { ...interSpec, label: value }
    console.log(newobj)
    setSpec(newobj)
  }
  const handlePoper = (Event: React.ChangeEvent<HTMLInputElement>) => {
    interSpec.username = Event.target.value
  }
  const openMarkdown = () => {
    setModal2Open(true)
  }
  useEffect(() => {
    markDownref.current?.changeMd(mdvalue)
    if (!modal2Open) {
      const res = markDownref.current?.requireText()
      setMd(res || '')
    }
  }, [modal2Open])
  return (
    <div className={styles.root}>
      <Form layout="vertical" autoComplete="off">
        <Row>
          <Col span={7} offset={0.5}>
            <Form.Item name="name" label="状态">
              <Select
                defaultValue="已发布"
                options={[
                  {
                    value: '已发布',
                    label: <Badge color="green" text="已发布" />
                  },
                  {
                    value: '测试中',
                    label: <Badge color="rgb(250,140,22)" text="测试中" />
                  },
                  {
                    value: '将废弃',
                    label: <Badge color="rgb(170,170,170)" text="将废弃" />
                  },
                  {
                    value: '开发中',
                    label: <Badge color="rgb(38,151,255)" text="开发中" />
                  }
                ]}
                onChange={(value) => (interSpec.name = value)}
              />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item name="username" label="负责人">
              <Input defaultValue={''} onChange={handlePoper} />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item name="label" label="标签">
              <Space style={{ width: '100%' }} direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="选择标签"
                  options={options}
                />
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.markdown}>
        <div className={styles.extend}>
          <Tag onClick={openMarkdown} className={styles.tag} color="#f50">
            预览
          </Tag>
        </div>
        <TextArea
          style={{ paddingRight: 20 }}
          rows={4}
          value={mdvalue}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setMd(event.target.value)}
          placeholder="支持MarkDown格式"
        />
      </div>
      <Modal
        title="MarkDown编辑器"
        centered
        width={'60%'}
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <DemoEditor ref={markDownref} />
      </Modal>
    </div>
  )
}
export default memo(InterSpec)
