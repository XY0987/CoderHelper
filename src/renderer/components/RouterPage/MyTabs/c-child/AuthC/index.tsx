import { Input, Select } from 'antd'
import React, { ReactElement, memo, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
interface Props {
  children?: ReactNode
}
// Filter `option.label` match the user type `input`
const AuthC: FC<Props> = () => {
  const [selectitem, setItem] = useState<string>('')
  const [currentComponent, setCom] = useState<ReactElement>()
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  const onChange = (value: string) => {
    switch (value) {
      case 'Bearer Token':
        setCom(BeakerTOken)
        break
      default:
        setCom(<></>)
        break
    }
    setItem(value)
  }
  const BeakerTOken = () => {
    return (
      <>
        <div style={{ marginTop: '30px' }}>
          <div className={styles.typename}>
            <span>Beader Token</span>
          </div>
          <Input placeholder="" />
        </div>
      </>
    )
  }
  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.typename}>
            <span>类型</span>
          </div>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            className={styles.Select}
            filterOption={filterOption}
            options={[
              {
                value: 'Bearer Token',
                label: 'Bearer Token'
              },
              {
                value: 'lucy',
                label: 'Lucy'
              },
              {
                value: 'tom',
                label: 'Tom'
              }
            ]}
          />
        </div>
        <div className={styles.content}>{currentComponent}</div>
      </div>
    </>
  )
}
export default memo(AuthC)
