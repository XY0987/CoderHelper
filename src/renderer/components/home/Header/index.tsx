import { Dropdown, MenuProps } from 'antd'
import style from './index.module.scss'
import avator from '@renderer/assets/avator.jpg'
import { useModal } from '@renderer/hooks/modal'
import { editUserInfoOperator } from './operator'
import { useUserInfoToLocalHook } from '@renderer/hooks/userInfoLogin'
import { uploadUserInfoApi } from '@renderer/aRequest/user'

export default function Header() {
  const { init, messageTips } = useModal({
    type: 'form',
    formOptions: editUserInfoOperator,
    title: '修改用户信息'
  })
  const { init: logoutTips } = useModal({
    type: 'nomal',
    infoTxt: '确定要退出吗'
  })
  const { userLogout, userUpload } = useUserInfoToLocalHook()
  const quit = () => {
    logoutTips()
      .then(() => {
        userLogout()
      })
      .catch(() => {
        messageTips({
          type: 'info',
          content: '已取消'
        })
      })
  }
  const editUserInfo = () => {
    const obj = {
      userName: localStorage.getItem('userName'),
      userSlogan: localStorage.getItem('userSlogan'),
      userImg: ''
    }
    init(obj)
      .then((res) => {
        return uploadUserInfoApi(res)
      })
      .then((res) => {
        console.log(res)
        userUpload()
      })
      .catch((_err) => {
        messageTips({
          type: 'info',
          content: '已取消'
        })
      })
  }
  const items: MenuProps['items'] = [
    {
      label: <span onClick={editUserInfo}>修改用户信息</span>,
      key: '0'
    },
    {
      label: <span onClick={quit}>退出登录</span>,
      key: '1'
    }
  ]
  return (
    <div className={style.container}>
      <div className={style.operates}>
        <div className={style.userInfo}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <img className={style.userImg} src={avator} alt="" />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
