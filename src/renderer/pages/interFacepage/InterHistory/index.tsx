import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
interface Props {
  children?: ReactNode
}
const InterHistory: FC<Props> = () => {
  return <div>InterHistory</div>
}
export default memo(InterHistory)
