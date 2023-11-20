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

export const getCollectProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/getCollectProject',
    method: 'GET',
    params: data
  })

export const collectProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/collectProject',
    method: 'GET',
    params: data
  })

export const delCollectProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/delCollectProject',
    method: 'DELETE',
    params: data
  })

export const getPublicProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/getPublicProject',
    method: 'GET',
    params: data
  })

export const getProjectCollectInfoApi = (data: any) =>
  myRequest.request({
    url: '/project/getProjectCollectInfo',
    method: 'GET',
    params: data
  })
