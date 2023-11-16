import { SmallDashOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import { Button, Dropdown } from 'antd'

import avator from '@renderer/assets/avator.jpg'
import { useAsync } from '@renderer/hooks/utils'
import { useCallback, useEffect, useState } from 'react'
import {
  addProjectApi,
  delProjectApi,
  editProjectApi,
  getProjectApi
} from '@renderer/aRequest/user/meeting'
import Paging from '@renderer/components/utils/Pagintg'
import Loading from '@renderer/components/utils/Loading'
import { useModal } from '@renderer/hooks/modal'
import EmptyNoData from '@renderer/components/utils/Empty'
import { addProjectOptions, editProjectOptions } from './options'
export default function ProjectManage() {
  const { run, data = [], retry, total, isLoading, isNodata } = useAsync()
  const { init } = useModal({
    type: 'nomal',
    infoTxt: '确定要删除吗？'
  })

  const { init: addModal } = useModal({
    type: 'form',
    formOptions: addProjectOptions
  })

  const { init: editModal } = useModal({
    type: 'form',
    formOptions: editProjectOptions
  })

  const [pagingConfig, setPagingConfig] = useState({
    pageNo: 1,
    pageSize: 10,
    onChangeFn,
    power: 0
  })
  function onChangeFn(current: number, pageSize: number) {
    setPagingConfig({ ...pagingConfig, pageSize, pageNo: current })
  }

  const fetchProjects = useCallback(
    () =>
      getProjectApi({
        beginIndex: pagingConfig.pageNo,
        size: pagingConfig.pageSize,
        power: pagingConfig.power
      }),
    [pagingConfig]
  )
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [pagingConfig, run, fetchProjects])

  const delFn = (item: any) => {
    init()
      .then(() => {
        return delProjectApi({ projectId: item.projectId })
      })
      .then((res) => {
        console.log(res)
        retry.current()
      })
      .catch(() => {})
  }

  const addProject = () => {
    addModal()
      .then((res) => {
        console.log(res)
        return addProjectApi(res)
      })
      .then((res) => {
        console.log(res)
        retry.current()
      })
      .catch(() => {})
  }
  const editProject = (item: any) => {
    console.log(item)
    editModal(item)
      .then((res: any) => {
        console.log(res)
        return editProjectApi({ ...res, projectId: item.projectId })
      })
      .then(() => {
        retry.current()
      })
      .catch(() => {})
  }
  return (
    <div>
      <div>
        <Button onClick={addProject}>添加</Button>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className={style.container}>
          {data &&
            data.map((item: any) => {
              return (
                <div className={style.projectItem} key={item.projectId}>
                  <div className={style.projectHeader}>
                    <img src={avator} className={style.projectImg} alt="" />
                    <span className={style.projectTitle}>{item.projectName}</span>
                  </div>
                  <div className={style.projectDesc}>{item.projectDesc}</div>
                  <div className={style.projectOperator}>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: item.projectId,
                            label: <span onClick={() => delFn(item)}>删除</span>
                          },
                          {
                            key: `${item.projectId}-0`,
                            label: <span onClick={() => editProject(item)}>修改</span>
                          }
                        ]
                      }}
                    >
                      <SmallDashOutlined />
                    </Dropdown>
                  </div>
                </div>
              )
            })}
        </div>
      )}
      {isNodata ? <EmptyNoData></EmptyNoData> : null}
      <Paging {...pagingConfig} total={total}></Paging>
    </div>
  )
}
