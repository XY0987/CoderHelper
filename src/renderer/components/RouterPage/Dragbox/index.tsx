import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Empty } from 'antd'

interface Props {
  children?: React.ReactNode
}
const Dragbox: FC<Props> = ({ children }) => {
  //点击起始位置
  const [startY, setStartY] = useState<number>(0)
  //高度
  const [startHeight, setStartHeight] = useState<number>(25)
  //暂存
  const [temp, setTemp] = useState<number>(100)
  //拖拽状态
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isshow, setshow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  //点击事件
  const handleMouseDown = (event: MouseEvent) => {
    //初始位置
    setStartY(event.clientY)
    setIsDragging(true)
  }
  //点击进行移动
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      //移动的距离
      const movey = event.clientY - startY
      if (movey > 0) {
        //往下移动
        setStartHeight(temp - movey)
      } else {
        //往上移动
        setStartHeight(temp - movey)
      }
    }
  }
  //松开，接触拖拽
  const handleMouseUp = () => {
    setIsDragging(false)
    setTemp(startHeight)
  }
  //绑定事件
  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        node.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, startY, startHeight])
  const changeheight = () => {
    if (startHeight !== 25) {
      setStartHeight(25)
    } else {
      setStartHeight(150)
    }
    setshow(!isshow)
  }
  return (
    <div className={styles.root} style={{ height: `${startHeight}px` }}>
      <div ref={ref} className={styles.top}>
        •••
      </div>
      <div className={styles.contarin}>
        <header className={styles.header}>
          <div className={isshow ? styles.active : ''}>
            <i onClick={changeheight} className="iconfont icon-xiangxia"></i>
          </div>
        </header>
        {!children ? <Empty /> : children}
      </div>
    </div>
  )
}

export default Dragbox
