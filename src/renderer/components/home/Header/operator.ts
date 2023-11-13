import { formType } from '@renderer/types/formTypes'

export const editUserInfoOperator: formType[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'userName',
    placeholder: '请输入用户名'
  },
  {
    type: 'input',
    label: '个性签名',
    name: 'userSlogan',
    placeholder: '请输入个性签名'
  }
]
