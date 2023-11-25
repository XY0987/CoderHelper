import Layout from '@renderer/components/home/Layout'
import message from '@renderer/utils/message'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    message.init('ws://127.0.0.1:18080', { userId: localStorage.getItem('userId') })
  }, [])
  return (
    <div>
      <Layout></Layout>
    </div>
  )
}
