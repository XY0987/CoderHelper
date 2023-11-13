import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { getUserInfoApi } from '@renderer/aRequest/user'
import { login } from '@renderer/store/userSlice'

export const useUserInfoToLocalHook = () => {
  const dispatch = useDispatch()
  const userInfo = useRef(useSelector((store: any) => store.user))
  const getUserInfo = () => {
    return userInfo.current
  }

  // 登录信息持久化
  const userPersistence = async () => {
    const token = localStorage.getItem('token') || ''
    if (userInfo.current.token === '' && token !== '') {
      // 信息丢失
      const user = await getUserInfoApi()
      localStorage.setItem('userId', user.data.userId)
      localStorage.setItem('userEmail', user.data.userEmail)
      localStorage.setItem('userName', user.data.userName)
      localStorage.setItem('userImg', user.data.userImg)
      localStorage.setItem('userSlogan', user.data.userSlogan)
      userInfo.current = user.data
      dispatch(
        login({
          token,
          userInfo: user
        })
      )
    }
  }

  const userLogin = async (token: string) => {
    localStorage.setItem('token', `Bearer ${token}`)
    userPersistence()
  }

  const userLogout = () => {
    localStorage.setItem('userId', '')
    localStorage.setItem('userEmail', '')
    localStorage.setItem('userName', '')
    localStorage.setItem('userImg', '')
    localStorage.setItem('userSlogan', '')
    localStorage.setItem('token', '')
    dispatch(
      login({
        token: '',
        userInfo: {}
      })
    )
  }

  return {
    getUserInfo,
    userPersistence,
    userLogin,
    userLogout
  }
}
