import { formType } from '@renderer/types/formTypes'

export const addProjectOptions: formType[] = [
  {
    type: 'input',
    label: '项目名称',
    name: 'projectName',
    placeholder: '请输入项目名称',
    rules: [
      { required: true, message: '请输入直播标题' },
      { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }
    ]
  },
  {
    type: 'input',
    label: '导入连接',
    name: 'projectApiUrl',
    placeholder: '项目接口json数据连接',
    rules: [
      { required: true, message: '项目接口json数据连接' },
      { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }
    ]
  },
  {
    type: 'input',
    label: '项目访问前缀',
    name: 'projectBaseUrl',
    placeholder: '请输入项目接口访问前缀'
  },
  {
    type: 'switch',
    label: '是否公开',
    name: 'projectIsPub',
    openTxt: '公开',
    closeTxt: '私有'
  },
  {
    type: 'textArea',
    label: '项目描述',
    name: 'projectDesc',
    placeholder: '请输入项目描述'
  }
]

export const editProjectOptions: formType[] = [
  {
    type: 'input',
    label: '项目名称',
    name: 'projectName',
    placeholder: '请输入项目名称',
    rules: [
      { required: true, message: '请输入直播标题' },
      { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }
    ]
  },
  {
    type: 'switch',
    label: '是否公开',
    name: 'projectIsPub',
    openTxt: '公开',
    closeTxt: '私有'
  },
  {
    type: 'textArea',
    name: 'projectDesc',
    label: '项目描述',
    placeholder: '请输入项目项目描述',
    rules: [
      { required: true, message: '请输入项目项目描述' },
      { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }
    ]
  }
]
