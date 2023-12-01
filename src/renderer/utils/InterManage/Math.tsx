/* eslint-disable no-prototype-builtins */
import { MenuProps } from 'antd'
import { Interinfo } from '../../types/apiTypes'
import { FolderOpenOutlined, LayoutFilled } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import Methodprops from '../../components/APImethods/Methodprops'
import PullDown from '../../components/RouterPage/PullDown'
import { InterRootmain, TabBartype } from '../../types/InterTypes'
type MenuItem = Required<MenuProps>['items'][number]
//生成Menu 菜单
export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}
type SwaggerData = {
  'x-paths'?: {
    [path: string]: any
  }
  'x-tags'?: any
  paths?: {
    [path: string]: any
  }
  tags?: any
}
interface ApiCategory {
  [category: string]: PathInfo[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PathInfo {
  // 在此处定义路径信息的接口
}

export function categorizeApiByTags(swaggerData: SwaggerData): ApiCategory {
  // 创建一个对象来存储接口分类和接口信息
  const apiCategories: ApiCategory = {}

  // 解析Swagger文档
  const parsedSwagger: SwaggerData = {
    'x-tags': swaggerData['x-tags'] || swaggerData['tags'] || [],
    'x-paths': swaggerData['x-paths'] || swaggerData['paths'] || {}
  }

  // 遍历"x-tags"中的每个标签
  for (const tag of parsedSwagger['x-tags'] || []) {
    const tagName: string = tag['name']

    // 创建一个空数组来存储该分类下的接口信息
    apiCategories[tagName] = []
  }

  // 遍历"x-paths"中的每个路径
  for (const [path, pathInfo] of Object.entries(parsedSwagger['x-paths'] || {})) {
    // 获取该路径的标签（tags）
    const tags: string[] = pathInfo['get']?.['tags'] || []

    // 遍历该路径的标签
    for (const tag of tags) {
      // 创建一个包含路径和信息的对象，并将其添加到相应分类下
      if (apiCategories[tag]) {
        const pathObject = {
          path,
          info: pathInfo['get'],
          method: 'get'
        }
        apiCategories[tag].push(pathObject)
      }
    }
    // 如果路径有其他HTTP方法（POST、PUT、DELETE等），也进行相同的分类
    const httpMethods = ['post', 'put', 'delete', 'patch'] // 这里可以扩展其他方法
    for (const method of httpMethods) {
      if (pathInfo[method]) {
        const methodTags: string[] = pathInfo[method]?.['tags'] || []
        for (const tag of methodTags) {
          if (apiCategories[tag]) {
            const pathObject = {
              path,
              info: pathInfo[method],
              method: method
            }
            apiCategories[tag].push(pathObject)
          }
        }
      }
    }
  }

  return apiCategories
}
interface Project {
  title: string
  version: string
  description: string
  license: string
  InterNum: number
  modelCount: number
}
//分析项目大体介绍
export function analyzeSwaggerProjectInfo(swaggerData: any): Project {
  try {
    const parsedSwagger: any = JSON.parse(JSON.stringify(swaggerData))
    // 计算接口数
    let endpointCount = 0
    // 遍历 paths 下的每个路径
    const paths = parsedSwagger['x-paths'] || parsedSwagger['paths'] || {}
    console.log(paths)
    // 遍历 paths 下的每个路径
    for (const path in paths) {
      if (paths.hasOwnProperty(path)) {
        // 遍历每个路径下的 HTTP 方法
        for (const method in paths[path]) {
          if (paths[path].hasOwnProperty(method)) {
            endpointCount++
          }
        }
      }
    }
    const modelCount = Object.keys(
      parsedSwagger.definitions || parsedSwagger.components?.schemas || {}
    ).length

    // 提取项目信息
    const projectInfo: Project = {
      title: parsedSwagger['x-info']?.['title'] || parsedSwagger['info']?.['title'] || '',
      version: parsedSwagger['x-info']?.['version'] || parsedSwagger['info']?.['version'] || '',
      description:
        parsedSwagger['x-info']?.['description'] || parsedSwagger['info']?.['description'] || '',
      license:
        parsedSwagger['x-info']?.['license']?.['name'] ||
        parsedSwagger['info']?.['license']?.['name'] ||
        '',
      InterNum: endpointCount,
      modelCount: modelCount
    }

    return projectInfo
  } catch (error) {
    console.error('解析Swagger文档时出错:', error)
    return {
      title: '',
      version: '',
      description: '',
      license: '',
      InterNum: 0,
      modelCount: 0
    }
  }
}
//生成接口目录
export function InterfaceDirectory(APIinfo: { [key: string]: InterRootmain[] }) {
  const keys = Object.keys(APIinfo)
  //判空
  if (keys.length === 0) return []
  const temp: ItemType[] = []
  for (const k of keys) {
    //第一级目录
    const InterFistername = k
    const key = k
    const Icon = <FolderOpenOutlined />
    //生成二级目录
    const temp2: ItemType[] = []
    for (const j of APIinfo[k]) {
      const InterSecondname = j.info.summary
      const key = j.info.summary + `&${j.info.operationId}`
      const Icon = <Methodprops method={`${j.method}`} />
      temp2.push(getItem(<PullDown itemname={InterSecondname} type="Interinner" />, key, Icon))
    }
    temp.push(getItem(<PullDown type="Inter" itemname={InterFistername} />, key, Icon, temp2))
  }
  //返回目录结构
  const Items: MenuItem[] = [
    getItem('项目介绍', '项目概述', <LayoutFilled />),
    getItem(<PullDown type="Inter" itemname="接口" />, 'jdiwnxigg', <LayoutFilled />, temp)
  ]
  return Items
}
//生成Tab
export function GetTabItem(
  label: React.ReactNode | string,
  children: React.ReactNode,
  key: string,
  closable?: boolean
): TabBartype {
  return {
    label,
    children,
    key,
    closable
  }
}
//防抖
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
