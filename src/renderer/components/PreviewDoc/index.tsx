/* eslint-disable react/jsx-key */
import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import Methodprops from '../APImethods/Methodprops'
import { Badge, Collapse, CollapseProps, Popover, Select, Space, Tabs, Tag } from 'antd'
import { copyToClipboard } from '../../utils/utils'
import ParamItem from './C-child/Param-Item'
import { CodeOutlined } from '@ant-design/icons'
import { InterRootmain } from '../../types/InterTypes'
import { interState } from '../../enum/inter'
import Docbody from './C-child/Docbody'
import TitleCom from '../RouterPage/TitleCom'
interface Props {
  children?: ReactNode
  inter: InterRootmain
}
const PreviewDoc: FC<Props> = (props) => {
  const { inter } = props
  const ParamsItem = () => {
    return (
      <>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {[1, 1, 1, 1].map((item) => {
            return (
              <ParamItem
                info={{
                  name: '名字',
                  type: 'integer',
                  desc: '名字介绍',
                  isSelect: false
                }}
              />
            )
          })}
        </Space>
      </>
    )
  }
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Query参数',
      children: ParamsItem(),
      extra: (
        <Tag
          icon={<CodeOutlined />}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          生成代码
        </Tag>
      )
    }
  ]
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  //生成目录
  const Tabsitems = (): any[] => {
    const keys = Object.keys(inter.info.responses)
    const res = keys.map((item, index) => {
      const body = {
        info: inter.info.responses[item],
        name: interState[item],
        code: item,
        type: 'JSON'
      }
      return {
        label: item + `(${interState[item]})`,
        key: index,
        children: <Docbody info={body} />
      }
    })
    return res
  }
  return (
    <div className={styles.root}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <TitleCom>
          <h5>已录取</h5>
        </TitleCom>
        <Space>
          <Methodprops method="get" />
          <Popover content={'点击复制'}>
            <span
              style={{ fontSize: 14 }}
              onClick={() => copyToClipboard('/api/getuser')}
              className={styles.clickfuzhi}
            >
              /api/getuser
            </span>
          </Popover>
          <Select
            defaultValue="已发布"
            options={[
              {
                value: '已发布',
                label: <Badge color="green" text="已发布" />
              },
              {
                value: '测试中',
                label: <Badge color="rgb(250,140,22)" text="测试中" />
              },
              {
                value: '将废弃',
                label: <Badge color="rgb(170,170,170)" text="将废弃" />
              },
              {
                value: '开发中',
                label: <Badge color="rgb(38,151,255)" text="开发中" />
              }
            ]}
          />
        </Space>
        <div>
          <Space>
            <Tag bordered={false} color="processing">
              excel管理
            </Tag>
            <Tag bordered={false} color="processing">
              接口
            </Tag>
            <Tag bordered={false} color="processing">
              大王
            </Tag>
            <Tag bordered={false} color="processing">
              未来小组
            </Tag>
          </Space>
        </div>
        <div className={styles.Interinfo}>
          <span className={styles.Interinfobox}>
            创建时间
            <span className={styles.spaninner}>2023年9月25</span>
          </span>
          <span className={styles.Interinfobox}>
            修改时间
            <span className={styles.spaninner}>一个小时前</span>
          </span>
          <span className={styles.Interinfobox}>
            修改者
            <span className={styles.spaninner}>赵子豪</span>
          </span>
          <span className={styles.Interinfobox}>
            创建者
            <span className={styles.spaninner}>赵子豪</span>
          </span>
          <span className={styles.Interinfobox}>
            目录
            <span className={styles.spaninner}>excel管理</span>
          </span>
        </div>
        <TitleCom>
          <h5>请求参数</h5>
        </TitleCom>
        <Collapse size="small" items={items} defaultActiveKey={['1']} onChange={onChange} />
        <TitleCom>
          <h5>返回响应</h5>
        </TitleCom>
        <Tabs onChange={onChange} type="card" size="small" items={Tabsitems()} />
      </Space>
    </div>
  )
}
export default memo(PreviewDoc)
