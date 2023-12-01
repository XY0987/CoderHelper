import { SmallDashOutlined } from '@ant-design/icons'
import { getCollectProjectMergeApi } from '@renderer/aRequest/aMerge/getCollectInfo'
import { delCollectProjectApi } from '@renderer/aRequest/user'
import ProjectItem from '@renderer/components/projectItem'
import EmptyNoData from '@renderer/components/utils/Empty'
import Loading from '@renderer/components/utils/Loading'
import Paging from '@renderer/components/utils/Pagintg'
import { useModal } from '@renderer/hooks/modal'
import { useAsync } from '@renderer/hooks/utils'
import { Dropdown } from 'antd'
import { useCallback, useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ProjectCollect() {
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
      getCollectProjectMergeApi({
        beginIndex: pagingConfig.pageNo,
        size: pagingConfig.pageSize,
        power: pagingConfig.power
      }),
    [pagingConfig]
  )
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [pagingConfig, run, fetchProjects])

  const { init } = useModal({
    infoTxt: '确定要取消收藏吗'
  })

  const delCollect = (item: any) => {
    init()
      .then(() => {
        return delCollectProjectApi({ projectId: item.projectId })
      })
      .then(() => {
        retry.current()
      })
  }

  const DropDownCollectProject = ({ item }: { item: any }) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: item.projectId,
              label: <span onClick={() => delCollect(item)}>取消收藏</span>
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
