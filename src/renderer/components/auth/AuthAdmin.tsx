import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function AuthAdmin(power: string, title: string, Element: React.FC) {
  const navigate = useNavigate()
  useEffect(() => {
    // 如果
    document.title = title
  }, [])
  return <Element></Element>
}
