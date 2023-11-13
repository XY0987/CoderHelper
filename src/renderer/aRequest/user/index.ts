import { myRequest } from '../request'
// 获取用户信息

export const getUserInfoApi = () =>
  myRequest.request({
    url: '/user/getuserInfo',
    method: 'GET'
  })
