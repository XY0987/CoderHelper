import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import AdvanceForm from '../../../AdvancedForms'
interface Props {
  children?: ReactNode
}
const HeaderC: FC<Props> = () => {
  return <AdvanceForm />
}
export default memo(HeaderC)
