import React from 'react'

/*
input 文本框
textArea 文本框
inputNumber 数字框
radio 单选框
select 选择器
switch 开关
timeDefault 时间
timeRange 时间范围
file 文件(默认只判断图片)
editor 富文本
*/
export type formItemType =
  | 'input'
  | 'textArea'
  | 'inputNumber'
  | 'radio'
  | 'select'
  | 'switch'
  | 'timeDefault'
  | 'timeRange'
  | 'file'
  | 'editor'

/*
type：类型
rules：规则
label：form表单显示的左边的文本
name：对应的字段名
limit：限制文本字数或者文件个数
isShowTxtCount：是否显示文本字数
maxNumber：类型为数字框时，最大数字
minNumber：类型为数字框时，最小数字
step：小数
isCustom：是否是自定义组件
placeholder：提示文本
defaultValues：form表单的默认值(修改时用)
data：类型为单选框或者选择框时的数据
isMultiple：是否支持多选
openTxt：开关开启时显示的文本
closeTxt：开关关闭时显示的文本
format：时间格式化
dataValue：类型为select/radio时确定回调时的字段名
dataName：类型为select/radio时显示的字段名
*/
export type formType = {
  type?: formItemType
  rules?: any[]
  label: string
  name: string
  limit?: number
  isShowTxtCount?: boolean
  maxNumber?: number
  minNumber?: number
  step?: any
  isCustom?: boolean
  Custom?: React.FC
  placeholder?: string
  defaultValues?: any
  data?: any[]
  isMultiple?: boolean
  openTxt?: string
  closeTxt?: string
  format?: string
  dataValue?: string
  dataName?: string
}
