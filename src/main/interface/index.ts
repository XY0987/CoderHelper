import axios from 'axios'
const fs = require('fs')
const FormData = require('form-data')

export const getData = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      params: data
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const postDataUploadFile = (url: string, data: any, filePath: string) => {
  return new Promise((resolve, reject) => {
    const formdata = new FormData()
    for (let key in data) {
      formdata.append(key, data[key])
    }
    formdata.append('file', fs.createReadStream(filePath))
    axios({
      method: 'POST',
      url,
      data: formdata,
      headers: {
        formdata: formdata.getHeaders(),
        maxBodyLength: Infinity //限制上传的大小
      }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
