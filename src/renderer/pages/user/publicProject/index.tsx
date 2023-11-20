import { SmallDashOutlined } from '@ant-design/icons'
import { getPublicProjectMergeApi } from '@renderer/aRequest/aMerge/getCollectInfo'
import { collectProjectApi, delCollectProjectApi } from '@renderer/aRequest/user'
import ProjectItem from '@renderer/components/projectItem'
import EmptyNoData from '@renderer/components/utils/Empty'
import Loading from '@renderer/components/utils/Loading'
import Paging from '@renderer/components/utils/Pagintg'
import { useModal } from '@renderer/hooks/modal'
import { useAsync } from '@renderer/hooks/utils'
import { Dropdown } from 'antd'
import { useCallback, useEffect, useState } from 'react'

export default function PublicProject() {
  const { init: delCollectModal } = useModal({
    type: 'nomal',
    infoTxt: '确定要取消收藏吗'
  })
  const { run, data = [], retry, total, isLoading, isNodata } = useAsync()
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
      getPublicProjectMergeApi({
        beginIndex: pagingConfig.pageNo,
        size: pagingConfig.pageSize
      }),
    [pagingConfig]
  )
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [pagingConfig, run, fetchProjects])

  const addCollect = (item: any) => {
    collectProjectApi({ projectId: item.projectId }).then(() => {
      retry.current()
    })
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

  const DropDownCollectProject = ({ item }: { item: any }) => {
    return (
      <Dropdown
        menu={{
          items: [
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
      {isLoading ? (
        <Loading></Loading>
      ) : (
        data && <ProjectItem data={data} DropDownProp={DropDownCollectProject}></ProjectItem>
      )}
      {isNodata ? <EmptyNoData></EmptyNoData> : null}
      <Paging {...pagingConfig} total={total}></Paging>
    </div>
  )
}
