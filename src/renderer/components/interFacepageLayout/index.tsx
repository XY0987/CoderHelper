import React, { memo, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { usedispatch } from '../../store'
import { fecthInterJSON } from '../../store/InterManage'
import qs from 'qs'
interface Props {
  children?: ReactNode
}
const UseLayout: FC<Props> = () => {
  const location = useLocation()
  const dispatch = usedispatch()
  const [ProjectID, SetID] = useState<string>('')
  //管理路由地址，切换active
  const [currentPage, setPage] = useState<string>('/intermanage')
  //存储在store中接口数据  之后改成传来参数，异步获取接口数据，
  useEffect(() => {
    dispatch(fecthInterJSON())
    SetPath()
  }, [dispatch])
  const navigate = useNavigate()
  //setCurrentPage
  const SetPath = () => {
    const query = location.search.slice(1)
    const path = location.pathname
    const ProjectId = qs.parse(query).projectId as string
    SetID(ProjectId)
    setPage(`/${path.slice(6)}?projectId=${ProjectId}`)
  }
  //返回首页
  const goback = () => {
    navigate('/home')
  }
  //改变路由
  const changerouter = (url: string) => {
    navigate('/user' + url)
    setPage(url)
  }
  return (
    <div id={styles.root}>
      <div className={styles.LeftColumn}>
        <div
          onClick={goback}
          className={styles.backHome}
          style={{
            backgroundImage:
              "url('https://img0.baidu.com/it/u=1691000662,1326044609&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695402000&t=87c2dcc375a2e6e483d41e36003f743e')"
          }}
        >
          <div className={styles.backHomeMask}>
            <i className="iconfont icon-zhuye"></i>
          </div>
        </div>
        <ul className={styles.LeftList}>
          <li
            onClick={() => changerouter(`/schedule?projectId=${ProjectID}`)}
            className={currentPage === `/schedule?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-jiekousheji"></i>
            <p>任务管理</p>
          </li>
          <li
            onClick={() => changerouter(`/intermanage?projectId=${ProjectID}`)}
            className={currentPage === `/intermanage?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-jiekousheji"></i>
            <p>接口管理</p>
          </li>
          <li
            onClick={() => changerouter(`/demand?projectId=${ProjectID}`)}
            className={currentPage === `/demand?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-xinicon_huabanfuben"></i>
            <p>需求管理</p>
          </li>
          <li
            onClick={() => changerouter(`/meeting?projectId=${ProjectID}`)}
            className={currentPage === `/meeting?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-xinicon_huabanfuben"></i>
            <p>会议</p>
          </li>

          <li
            onClick={() => changerouter(`/interhistory?projectId=${ProjectID}`)}
            className={currentPage === `/interhistory?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-lishi"></i>
            <p>接口历史</p>
          </li>
          <li
            onClick={() => changerouter(`/conference?projectId=${ProjectID}`)}
            className={currentPage === `/conference?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-xinjianhuiyi"></i>
            <p>成员管理</p>
          </li>
          <li
            onClick={() => changerouter(`/itemseting?projectId=${ProjectID}`)}
            className={currentPage === `/itemseting?projectId=${ProjectID}` ? styles.active : ''}
          >
            <i className="iconfont icon-shezhi"></i>
            <p>项目设置</p>
          </li>
        </ul>
      </div>
      <div className={styles.RightColumn}>
        <Outlet />
      </div>
    </div>
  )
}
export default memo(UseLayout)
