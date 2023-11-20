import { StarFilled, StarOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import avator from '@renderer/assets/avator.jpg'
export default function ProjectItem({
  data,
  DropDownProp
}: {
  data: any[]
  DropDownProp: React.FC<{ item: any }>
}) {
  return (
    <div className={style.container}>
      {data.map((item) => {
        return (
          <div className={style.projectItem} key={item.projectId}>
            <div className={style.projectHeader}>
              <img src={avator} className={style.projectImg} alt="" />
              <span className={style.projectTitle}>{item.projectName}</span>
            </div>
            <div className={style.projectDesc}>{item.projectDesc}</div>
            <div className={style.projectOperator}>
              <DropDownProp item={item}></DropDownProp>
              <div className={style.projectCollectInfo}>
                {item.isCollect ? <StarFilled style={{ color: '#FA8C16' }} /> : <StarOutlined />}
                <span className={style.txt}>{item.collectNum}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
