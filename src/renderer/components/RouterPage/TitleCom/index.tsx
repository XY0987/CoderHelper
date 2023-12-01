import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
interface Props {
  children?: ReactNode
}
const TitleCom: FC<Props> = (props) => {
  return <div className={styles.root}>{props.children}</div>
}
export default memo(TitleCom)
