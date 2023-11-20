import { getCollectProjectApi, getProjectCollectInfoApi, getPublicProjectApi } from '../user'
import { getProjectApi } from '../user/meeting'

const getApiMerge = (data: any, apiFetch: any) => {
  return new Promise((resolve, reject) => {
    const arr: any[] = []
    let r: any = {}
    apiFetch(data)
      .then((res) => {
        res.data.pagingRes.forEach((item: any) => {
          arr.push(getProjectCollectInfoApi({ projectId: item.projectId }))
        })
        r = res
        return Promise.all(arr)
      })
      .then((res: any) => {
        r.data.pagingRes.forEach((item: any, index: number) => {
          item.collectNum = res[index].data.collectNum
          item.isCollect = res[index].data.isCollect
        })
        resolve(r)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getCollectProjectMergeApi = (data: any) => {
  return getApiMerge(data, getCollectProjectApi)
}

export const getProjectMerageApi = (data: any) => {
  return getApiMerge(data, getProjectApi)
}

export const getPublicProjectMergeApi = (data: any) => {
  return getApiMerge(data, getPublicProjectApi)
}
