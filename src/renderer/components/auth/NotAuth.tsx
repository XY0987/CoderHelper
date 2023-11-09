import React, { useEffect } from 'react'

export default function NotAuth({ title, Element }: { title: string; Element: React.FC }) {
  useEffect(() => {
    // 如果
    document.title = title
  }, [])
  return <Element></Element>
}
