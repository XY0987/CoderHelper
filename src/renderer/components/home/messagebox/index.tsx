import { Drawer, Tabs, TabsProps } from 'antd'

import style from './index.module.scss'
import EmptyNoData from '@renderer/components/utils/Empty'
import { useState } from 'react'

export default function MessageBox({
  open,
  onClose,
  data
}: {
  open: boolean
  onClose: () => void
  data: any[]
}) {
  // 根据messageType区分
  const [messageType, setMessageType] = useState(0)

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: `分工信息(${data[0] ? data[0].length : 0})`
    },
    {
      key: '1',
      label: `接口信息(${data[1] ? data[1].length : 0})`
    },
    {
      key: '2',
      label: `召开会议(${data[2] ? data[2].length : 0})`
    },
    {
      key: '3',
      label: `系统通知(${data[3] ? data[3].length : 0})`
    }
  ]
  const onChange = async (key: string) => {
    setMessageType(Number(key))
  }

  return (
    <Drawer title="消息中心" placement="right" onClose={onClose} open={open} width={500}>
      <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
      {data[0] &&
        data[messageType].map((item: any) => {
          return (
            <div className={style.messageContainer} key={item.messageId}>
              <div className={style.messageTitle}>{item.messageTitle}</div>
              <div className={style.messageContent}>{JSON.parse(item.messageContent).content}</div>
            </div>
          )
        })}
      {data[messageType] && data[messageType].length == 0 ? <EmptyNoData></EmptyNoData> : null}
    </Drawer>
  )
}
