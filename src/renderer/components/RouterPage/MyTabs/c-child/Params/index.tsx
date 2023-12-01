import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import AdvanceForm from '../../../AdvancedForms'

interface Props {
  children?: ReactNode
}
const Params: FC<Props> = () => {
  return (
    <div className={styles.root}>
      <AdvanceForm />
    </div>
  )
}
export default memo(Params)
