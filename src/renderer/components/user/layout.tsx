import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
interface Props {
  children?: ReactNode
}
const home: FC<Props> = () => {
  return <div>我是user---latout</div>
}
export default memo(home)
