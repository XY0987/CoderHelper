import React, { useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'

export default function AuthAdmin(
  power: string,
  title: string,
  Element: React.FC,
  callBack?: (navigate: NavigateFunction, power: string) => void
) {
  const navigate = useNavigate()
  callBack && callBack(navigate, power)
  useEffect(() => {
    // 如果
    document.title = title
  }, [])
  return <Element></Element>
}
