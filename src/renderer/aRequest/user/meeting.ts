import { myRequest } from '../request'

export const getProjectApi = (data: any) =>
  myRequest.request({
    method: 'GET',
    url: '/project/getProject',
    params: data
  })

export const delProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/delProject',
    method: 'DELETE',
    params: data
  })

export const addProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/create',
    method: 'POST',
    data: data
  })

export const editProjectApi = (data: any) =>
  myRequest.request({
    url: '/project/edit',
    method: 'PUT',
    params: data
  })
