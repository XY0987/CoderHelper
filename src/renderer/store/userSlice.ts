// 用户的登录，退出，获取用户信息
import { createSlice } from '@reduxjs/toolkit'

export interface user {
  token: string
  userInfo: any
}
const initUser: user = {
  token: '',
  userInfo: {}
}

// 创建一个 Slice
export const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  // 定义 reducers 并生成关联的操作
  reducers: {
    login(store, { payload }) {
      store.token = payload.token
      store.userInfo = payload.userInfo
    },
    logout(store) {
      store.token = ''
      store.userInfo = {}
    }
  }
})
// 导出加减的方法
export const { login, logout } = userSlice.actions

// 默认导出
export default userSlice.reducer
