import React, { ReactElement, memo, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import { Tabs } from 'antd'
import { InterRootmain } from '../../../types/InterTypes'
import { interState } from '../../../enum/inter'
import Status from './c-chirdren/Status'
interface Props {
  children?: ReactNode
  inter: InterRootmain
}
interface Tab {
  label: string
  key: any
  children: ReactElement
}
const ResponseTab: FC<Props> = (props) => {
  const { inter } = props
  const [responese, SetResponse] = useState<Tab[]>([
    {
      key: 0,
      label: '',
      children: <></>
    }
  ])
  const onChange = (key: string) => {
    console.log(key)
  }
  useEffect(() => {
    const keys = Object.keys(inter.info.responses)

    const res = keys.map((item, index) => {
      const body = {
        info: inter.info.responses[item],
        name: interState[item],
        code: item
      }
      return {
        label: item + `(${interState[item]})`,
        key: index,
        children: <Status Statusinfo={body} />
      }
    })
    SetResponse(res)
  }, [])
  return (
    <div className={styles.root}>
      <Tabs onChange={onChange} type="card" items={responese} />
    </div>
  )
}
export default memo(ResponseTab)
