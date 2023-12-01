import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APIdate, APIdateOpenApi } from '../assets/mockdata/testDate'
import { InterRoot } from '../types/apiTypes'
import { analyzeSwaggerProjectInfo, categorizeApiByTags } from '../utils/InterManage/Math'
import { InterRootmain } from '../types/InterTypes'
export interface Intertype {
  InterJSON: any
  ProjectOutline: InterRoot & {
    InterNum: number
    modelCount: number
  }
  ProjectID: string
  InterCategorize: {
    [key: string]: InterRootmain[]
  }
}
//异步请求接口信息
export const fecthInterJSON = createAsyncThunk('interJSON', async (args, { dispatch }) => {
  //异步操作
  dispatch(changeJSON(APIdate))
  //项目大概
  dispatch(changeXinfo(analyzeSwaggerProjectInfo(APIdate)))
  //接口分类
  dispatch(changeInterCategorize(categorizeApiByTags(APIdate)))
})
const initialState: Intertype = {
  //接口JSON数据
  InterJSON: '',
  //项目概述
  ProjectOutline: {
    description: '',
    version: '',
    title: '',
    license: undefined,
    InterNum: 0,
    modelCount: 0
  },
  InterCategorize: {},
  ProjectID: ''
  //
}
export const InterManageSlice = createSlice({
  name: 'InterManage',
  initialState: initialState,
  reducers: {
    changeJSON(state, { payload }) {
      state.InterJSON = payload
    },
    changeXinfo(state, { payload }) {
      state.ProjectOutline = payload
    },
    changeInterCategorize(state, { payload }) {
      state.InterCategorize = payload
    }
  }
})
//暴露出actives
export const { changeJSON, changeXinfo, changeInterCategorize } = InterManageSlice.actions
export default InterManageSlice.reducer
