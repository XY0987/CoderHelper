// index.ts 文件
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { useSelector, TypedUseSelectorHook, shallowEqual, useDispatch } from 'react-redux'
// configureStore创建一个redux数据
export const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice
  }
})
const RootStatetype = store.getState() //获取返回值对象
export type RootStatetype0 = typeof RootStatetype //推导类型
export const useAppSelector: TypedUseSelectorHook<RootStatetype0> = useSelector
// 推导出 AppDispatch 类型，即 Redux store 中的 dispatch 函数类型
export type AppDispatch = typeof store.dispatch
export const appshallowEqual = shallowEqual
export const usedispatch: () => AppDispatch = useDispatch
