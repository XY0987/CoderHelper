import { myRequest } from '../request'
// 获取用户信息

export const getUserInfoApi = () =>
  myRequest.request({
    url: '/user/getuserInfo',
    method: 'GET'
  })

export const uploadUserInfoApi = (data: any) =>
  myRequest.request({
    url: '/user/uploadUserInfo',
    method: 'PUT',
    params: data
  })
