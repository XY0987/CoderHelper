import { Table } from 'antd'
import { ReactElement } from 'react'

export interface TabBartype {
  label: React.ReactNode | string
  children: React.ReactNode
  key: string
  closable?: boolean
}
export interface DataType {
  key: React.Key
  name: string
  age: string
  address: ReactElement | string
  isRequire?: ReactElement | string
}
export interface Item {
  key: string
  name: string
  age: string
  address: ReactElement | string
}

export interface EditableRowProps {
  index: number
}
export interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}
type EditableTableProps = Parameters<typeof Table>[0]

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>
export interface InterRootmain {
  path: string
  info: Info
  method: 'get' | 'post' | 'delete' | 'put' | 'options'
}

export interface Info {
  tags: string[]
  summary: string
  operationId: string
  produces: string[]
  responses: Responses
  security: Security[]
  deprecated: boolean
}

export interface Responses {
  [key: string]: any
}
export interface Security {
  token: string[]
}
export interface Statusinfo {
  info: any
  code: string
  name: string
}
export interface RouterAllinfo {
  interId: string
  method: string
  interPath: string
  Params: []
}
export interface ParamsRoot {
  name: string
  value: string
  type: string
  isRequire: boolean
}
