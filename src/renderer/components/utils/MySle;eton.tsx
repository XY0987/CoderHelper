import React from 'react'
import { Skeleton } from 'antd'

export default function MySkeleton() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: '1000px',
          margin: '0 auto'
        }}
      >
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}
