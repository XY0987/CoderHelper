import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import { useAppSelector } from '../../../store'
interface Props {
  children?: ReactNode
}
const ItemDesc: FC<Props> = () => {
  const { xinfo } = useAppSelector((state) => {
    return {
      xinfo: state.Inter.ProjectOutline
    }
  })
  return (
    <div className={styles.root}>
      <div className={styles.ProjectStatistics}>
        <h2>项目统计信息</h2>
        <div className={styles.ProjectDate}>
          <div className={styles.Card1}>
            <h2>{xinfo.InterNum}</h2>
            <span>接口数</span>
          </div>
          <div className={styles.Card1}>
            <h2>{xinfo.InterNum}</h2>
            <span>接口调用数</span>
          </div>
          <div className={styles.Card1}>
            <h2>0</h2>
            <span>文档数</span>
          </div>
          <div className={styles.Card1}>
            <h2>{xinfo.modelCount}</h2>
            <span>数据模型数</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(ItemDesc)
