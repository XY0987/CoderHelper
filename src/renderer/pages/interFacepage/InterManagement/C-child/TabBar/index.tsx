/* eslint-disable react/display-name */
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import { Tabs } from 'antd'
import { TabBartype } from '../../../../../types/InterTypes'
import Itemdesc from '../../../../../components/RouterPage/Itemdesc'
type TargetKey = React.MouseEvent | React.KeyboardEvent | string
interface Iprops {
  children?: ReactElement
}
//定义 ref 属性
interface Iforwardref {
  addTab: (label: ReactElement | string, children: ReactElement) => void
  test: (CSRcode: string) => any
}
const TabBar = forwardRef<Iforwardref, Iprops>((props, ref) => {
  const [items, setItems] = useState<TabBartype[]>([
    { label: '项目概述', children: <Itemdesc />, key: '1', closable: false }
  ])
  //切换选项
  const [activeKey, setActiveKey] = useState(items[items.length - 1].key)
  //选项卡中的项目，数组
  const newTabIndex = useRef(0)
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }
  useImperativeHandle(ref, () => {
    return {
      addTab(label: ReactElement | string, children: ReactElement) {
        add(label, children)
      },
      test
    }
  })
  const add = (label: ReactElement | string, children: ReactElement) => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    const newPanes = [...items]
    //最多十个标签，暂定  如果已经存在的标签。直接跳转到对应标签，不再新增
    if (newPanes.length > 10) {
      newPanes[9] = {
        label: label,
        children: children,
        key: newActiveKey
      }
    } else {
      newPanes.push({
        label: label,
        children: children,
        key: newActiveKey
      })
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  //检测已经存在此标签  测试版本
  const test = (CSRcode: any) => {
    for (const k of items) {
      if (k.label === CSRcode) {
        console.log('已经重复，直接跳转到这个地址')
        setActiveKey(k.key)
        return { ishas: true }
      }
    }
    return { ishas: false }
  }
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add(
        '新标签页',
        <>
          <span>你好</span>
        </>
      )
    } else {
      remove(targetKey)
    }
  }
  return (
    <Tabs
      style={{ height: '100%', overflow: 'auto' }}
      animated={{ inkBar: true, tabPane: true }}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  )
})

export default TabBar
