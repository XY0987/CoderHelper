import { myRequest } from '../request'

export const signinApi = async (data: any) =>
  myRequest.request({
    url: '/auth/signin',
    method: 'POST',
    data: data
  })

export const getCodeApi = async (data: any) =>
  myRequest.request({
    url: '/auth/getCode',
    method: 'GET',
    params: data
  })

export const signupApi = async (data: any) =>
  myRequest.request({
    url: '/auth/signup',
    method: 'POST',
    data: data
  })

export const editPasswordApi = async (data: any) =>
  myRequest.request({
    url: '/auth/editPassword',
    method: 'POST',
    data: data
  })
