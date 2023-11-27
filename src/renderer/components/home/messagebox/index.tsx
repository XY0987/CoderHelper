import { Drawer, Tabs, TabsProps } from 'antd'

import style from './index.module.scss'
import EmptyNoData from '@renderer/components/utils/Empty'

export default function MessageBox({
  open,
  onClose,
  data,
  setGetInfoConfig
}: {
  open: boolean
  onClose: () => void
  data: any
  setGetInfoConfig: any
}) {
  const items: TabsProps['items'] = [
    {
      key: '0',
      label: '分工信息'
    },
    {
      key: '1',
      label: '接口信息'
    },
    {
      key: '2',
      label: '召开会议'
    },
    {
      key: '3',
      label: '系统通知'
    }
  ]
  const onChange = (key: string) => {
    setGetInfoConfig((value: any) => {
      return {
        ...value,
        messageType: key
      }
    })
  }

  return (
    <Drawer title="消息中心" placement="right" onClose={onClose} open={open}>
      <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
      {data &&
        data.map((item: any) => {
          return (
            <div className={style.messageContainer} key={item.messageId}>
              <div className={style.messageTitle}>{item.messageTitle}</div>
              <div className={style.messageContent}>{item.messageContent}</div>
            </div>
          )
        })}
      {data && data.length == 0 ? <EmptyNoData></EmptyNoData> : null}
    </Drawer>
  )
}
