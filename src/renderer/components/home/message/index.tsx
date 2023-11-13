import { Drawer } from 'antd'

export default function Message({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}
