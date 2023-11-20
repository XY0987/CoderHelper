import { SmallDashOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useAsync } from '@renderer/hooks/utils'
import { useCallback, useEffect, useState } from 'react'
import { addProjectApi, delProjectApi, editProjectApi } from '@renderer/aRequest/user/meeting'
import Paging from '@renderer/components/utils/Pagintg'
import Loading from '@renderer/components/utils/Loading'
import { useModal } from '@renderer/hooks/modal'
import EmptyNoData from '@renderer/components/utils/Empty'
import { addProjectOptions, editProjectOptions } from './options'
import ProjectItem from '@renderer/components/projectItem'
import { getProjectMerageApi } from '@renderer/aRequest/aMerge/getCollectInfo'
import { collectProjectApi, delCollectProjectApi } from '@renderer/aRequest/user'
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
  const { init: delCollectModal } = useModal({
    type: 'nomal',
    infoTxt: '确定要取消收藏吗'
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
      getProjectMerageApi({
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
        return addProjectApi(res)
      })
      .then(() => {
        retry.current()
      })
      .catch(() => {})
  }
  const editProject = (item: any) => {
    editModal(item)
      .then((res: any) => {
        return editProjectApi({ ...res, projectId: item.projectId })
      })
      .then(() => {
        retry.current()
      })
      .catch(() => {})
  }

  const delCollect = (item: any) => {
    delCollectModal()
      .then(() => {
        return delCollectProjectApi({ projectId: item.projectId })
      })
      .then(() => {
        retry.current()
      })
      .catch(() => {})
  }

  const addCollect = (item: any) => {
    collectProjectApi({ projectId: item.projectId }).then(() => {
      retry.current()
    })
  }

  const DropDownProject = ({ item }: { item: any }) => {
    return (
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
            },
            item.isCollect
              ? {
                  key: `${item.projectId}-1`,
                  label: <span onClick={() => delCollect(item)}>取消收藏</span>
                }
              : {
                  key: `${item.projectId}-1`,
                  label: <span onClick={() => addCollect(item)}>收藏</span>
                }
          ]
        }}
      >
        <SmallDashOutlined />
      </Dropdown>
    )
  }

  return (
    <div>
      <div>
        <Button onClick={addProject}>添加</Button>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        data && <ProjectItem data={data} DropDownProp={DropDownProject}></ProjectItem>
      )}
      {isNodata ? <EmptyNoData></EmptyNoData> : null}
      <Paging {...pagingConfig} total={total}></Paging>
    </div>
  )
}
