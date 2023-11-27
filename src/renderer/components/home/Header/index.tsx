import { Badge, Dropdown, MenuProps } from 'antd'
import style from './index.module.scss'
import avator from '@renderer/assets/avator.jpg'
import { useModal } from '@renderer/hooks/modal'
import { editUserInfoOperator } from './operator'
import { useUserInfoToLocalHook } from '@renderer/hooks/userInfoLogin'
import { getMessageApi, setMessageIsReadApi, uploadUserInfoApi } from '@renderer/aRequest/user'
import { BellOutlined } from '@ant-design/icons'
import MessageBox from '../messagebox'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAsync } from '@renderer/hooks/utils'

export default function ApplyHeader({ projectId }: { projectId?: number }) {
  const navigate = useNavigate()

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
        navigate('/')
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

  const [open, setIsOpen] = useState<boolean>(false)
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

  const { run, data = [], total, retry } = useAsync()
  const [getInfoConfig, setGetInfoConfig] = useState({
    messageIsRead: 0,
    messageType: 0
  })
  const openFn = useCallback(() => {
    setMessageIsReadApi({ messageType: getInfoConfig.messageType }).then(() => {
      setIsOpen(true)
    })
  }, [getInfoConfig])

  const onClose = () => {
    setIsOpen(false)
    retry.current()
  }

  const fetchProjects = useCallback(
    () =>
      getMessageApi({
        messageIsRead: getInfoConfig.messageIsRead,
        messageType: getInfoConfig.messageType,
        messageProjectId: projectId
      }),
    [getInfoConfig]
  )
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [getInfoConfig, run, fetchProjects])
  return (
    <div className={style.container}>
      <div className={style.operates}>
        <div className={style.userInfo}>
          <div className={style.message} onClick={openFn}>
            <Badge count={total} offset={[5, 0]}>
              <BellOutlined style={{ fontSize: '20px' }} />
            </Badge>
          </div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <img className={style.userImg} src={avator} alt="" />
            </a>
          </Dropdown>
        </div>
        <MessageBox
          setGetInfoConfig={setGetInfoConfig}
          data={data}
          open={open}
          onClose={onClose}
        ></MessageBox>
      </div>
      <div className={style.headerTitle}>CoderHelper</div>
    </div>
  )
}
